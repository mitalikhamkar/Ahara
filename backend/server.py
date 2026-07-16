from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
from anthropic import AsyncAnthropic


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
anthropic_client = AsyncAnthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------------- Existing status routes (unchanged) ----------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Ahara API up"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ---------------- AI Nutrition Assistant ----------------
class ChatMessage(BaseModel):
    role: str  # 'user' | 'assistant'
    content: str


class UserProfile(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    activity_level: Optional[str] = None
    goal: Optional[str] = None
    food_preference: Optional[str] = None


class NutritionSnapshot(BaseModel):
    cal: Optional[float] = 0
    protein: Optional[float] = 0
    carbs: Optional[float] = 0
    fat: Optional[float] = 0
    fiber: Optional[float] = 0
    targets: Optional[Dict[str, float]] = None


class ChatRequest(BaseModel):
    session_id: str
    message: str
    profile: Optional[UserProfile] = None
    todays_nutrition: Optional[NutritionSnapshot] = None
    history: Optional[List[ChatMessage]] = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str


def _build_system_prompt(profile: Optional[UserProfile], snapshot: Optional[NutritionSnapshot]) -> str:
    parts = [
        "You are Ahara, a warm and knowledgeable AI nutrition coach — NOT a medical doctor.",
        "You help users understand nutrition, suggest meals & healthy alternatives, explain nutrients,",
        "and summarize daily progress. Keep replies concise, encouraging, and practical.",
        "Never diagnose medical conditions or prescribe treatments. If asked, gently redirect to a professional.",
        "Use plain language. Use short paragraphs and small bullet lists when helpful.",
    ]
    if profile:
        p = profile
        pieces = []
        if p.name: pieces.append(f"name={p.name}")
        if p.age: pieces.append(f"age={p.age}")
        if p.gender: pieces.append(f"gender={p.gender}")
        if p.height_cm: pieces.append(f"height={p.height_cm}cm")
        if p.weight_kg: pieces.append(f"weight={p.weight_kg}kg")
        if p.activity_level: pieces.append(f"activity={p.activity_level}")
        if p.goal: pieces.append(f"goal={p.goal}")
        if p.food_preference: pieces.append(f"diet={p.food_preference}")
        if pieces:
            parts.append("User profile: " + ", ".join(pieces) + ".")
    if snapshot:
        s = snapshot
        line = (f"Today so far → calories {(s.cal or 0):.0f}, protein {(s.protein or 0):.0f}g, "
                f"carbs {(s.carbs or 0):.0f}g, fat {(s.fat or 0):.0f}g, fiber {(s.fiber or 0):.0f}g.")
        parts.append(line)
        if s.targets:
            t = s.targets
            parts.append("Daily targets: " + ", ".join(f"{k} {v:.0f}" for k, v in t.items()) + ".")
    return "\n".join(parts)


@api_router.post("/ai/chat", response_model=ChatResponse)
async def ai_chat(req: ChatRequest):
    if not anthropic_client:
        return ChatResponse(
            reply=("The AI coach is currently unavailable — no ANTHROPIC_API_KEY is set. "
                   "Add one to backend/.env to enable this feature."),
            session_id=req.session_id,
        )
    try:
        system = _build_system_prompt(req.profile, req.todays_nutrition)

        # Build the message list: recent history + the new user message.
        anthro_messages = []
        if req.history:
            for m in req.history[-6:]:
                role = "user" if m.role == "user" else "assistant"
                anthro_messages.append({"role": role, "content": m.content})
        anthro_messages.append({"role": "user", "content": req.message})

        response = await anthropic_client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=1000,
            system=system,
            messages=anthro_messages,
        )
        reply_text = "".join(
            block.text for block in response.content if getattr(block, "type", None) == "text"
        ) or "Sorry, I didn't catch that — could you rephrase?"

        # Persist chat message pair (best-effort)
        try:
            await db.chat_messages.insert_one({
                "session_id": req.session_id,
                "user": req.message,
                "assistant": reply_text,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            })
        except Exception as e:
            logger.warning(f"chat persist failed: {e}")

        return ChatResponse(reply=reply_text, session_id=req.session_id)
    except Exception as e:
        logging.exception("AI chat error")
        return ChatResponse(
            reply=("I'm having trouble reaching my nutrition brain right now. "
                   "In the meantime, focus on lean protein, colorful vegetables, and enough water. "
                   f"(err: {type(e).__name__})"),
            session_id=req.session_id,
        )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
