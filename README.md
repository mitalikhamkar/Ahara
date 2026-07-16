# Ahara — AI Nutrition Companion

Full-stack app: **React (CRA + Craco + Tailwind)** frontend and **FastAPI + MongoDB** backend,
with an AI nutrition coach powered by the official **Anthropic Python SDK**.

```
ahara-app/
├── backend/
│   ├── server.py           # FastAPI app (status routes + /api/ai/chat)
│   ├── requirements.txt
│   └── .env                # MONGO_URL, DB_NAME, CORS_ORIGINS, ANTHROPIC_API_KEY
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── pages/           # Landing, Login, Signup, Onboarding, DashboardHome, MealBuilder,
    │   │                     # Scanner, CalendarPage, Reports, Profile, Assistant, DashboardLayout
    │   ├── components/ui/   # button, input, label, accordion, dialog, calendar
    │   ├── context/AuthContext.jsx
    │   ├── data/foods.js
    │   └── lib/utils.js
    ├── package.json
    ├── craco.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── .env                 # REACT_APP_BACKEND_URL
```

## ⚠️ If you unzip this into a folder already named `ahara-app`

The zip itself contains a top-level `ahara-app/` folder. If you extract it into
`...\MY PROJECTS\ahara-app\`, you'll end up with a **nested**
`...\MY PROJECTS\ahara-app\ahara-app\` — that's what happened in your terminal output. Either:
- Extract the zip directly into `MY PROJECTS\` (so you get `MY PROJECTS\ahara-app\backend\...`), or
- Just `cd` one level deeper (`cd ahara-app`) before running anything, same as you did.

Either way works — just make sure `dir` shows `backend` and `frontend` before you `cd backend`.

## Bugs fixed while assembling this (updated list)

1. **`Assistant.jsx`** — an unterminated single-quoted string (apostrophe in "today's") — fixed.
2. **`Scanner.jsx`** — same apostrophe bug in `'Nature's Kitchen'` — fixed.
3. **Missing `src/components/ui/*`** — `Button`, `Input`, `Label`, `Accordion`, `Dialog`, `Calendar`
   were imported everywhere but never defined. Added minimal working versions on Radix primitives.
4. **Missing `src/lib/utils.js`** — the `cn()` helper used by the UI components. Added it.
5. **Missing `frontend/.env`** — `Assistant.jsx` calls `process.env.REACT_APP_BACKEND_URL`, which
   was undefined everywhere. Added `REACT_APP_BACKEND_URL=http://localhost:8001`.
6. **Backend/frontend nutrition field mismatch** — backend expected `todays_nutrition.calories`,
   frontend sends `todays_nutrition.cal`. Fixed the backend model to match.
7. **`package.json`** — a non-existent lodash version (`4.18.1`, real lodash tops out at `4.17.21`),
   a `date-fns` v4 vs `react-day-picker` v8 peer conflict, and a React 19 vs. pinned-Radix-version
   conflict. Downgraded to `react`/`react-dom` `18.3.1` (what these package versions actually
   support) and fixed the pinned versions — verified with a full `npm install` + production build.
8. **`emergentintegrations==0.2.0` doesn't exist on public PyPI** (it's a private package from the
   platform this was originally scaffolded on — this is what broke your `pip install`). **Replaced
   it entirely** with the official `anthropic` SDK, which is public. `backend/server.py` now calls
   `anthropic_client.messages.create(...)` directly. `requirements.txt` was also trimmed — the
   original had a pile of unused dev/test tooling (boto3, cryptography, pytest, black, mypy, etc.)
   that `server.py` never actually imports; removed to cut install time and failure surface.
9. There were two different copies of `server.py` and `tailwind.config.js` in what was originally
   pasted to me; used the complete/final versions and discarded the stale scaffolding copies.

I verified all of the above by actually running `pip install`, `npm install`, and a full
`npm run build` in a sandbox before packaging this zip — not just eyeballing the code.

## Prerequisites

- **Node.js** 18 or 20 LTS + npm — https://nodejs.org
- **Python** 3.10+ — https://python.org
- **MongoDB** running locally on port 27017 (or point `MONGO_URL` in `backend/.env` at a hosted
  Mongo, e.g. MongoDB Atlas). Easiest local option: install
  [MongoDB Community Server](https://www.mongodb.com/try/download/community), or
  `docker run -d -p 27017:27017 mongo`.
- **VS Code**, with the "Python" extension.
- *(Optional, for the AI Coach page)* an Anthropic API key from
  https://console.anthropic.com/settings/keys

## 1. Open the project in VS Code

Unzip, then `File → Open Folder…` → select the `ahara-app` folder (the one directly containing
`backend` and `frontend`). Open a terminal with `` Ctrl+` ``. You'll want **two terminals** — one
for the backend, one for the frontend.

## 2. Run the backend

VS Code's default terminal on Windows is **PowerShell**, which does **not** support `&&` as a
command separator (that's bash/cmd syntax) — use `;` or separate lines instead.

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

**macOS/Linux (bash/zsh):**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

You should see `Uvicorn running on http://127.0.0.1:8001`. Leave this terminal running.

> **AI Coach:** open `backend/.env` and paste your key after `ANTHROPIC_API_KEY=`, then restart
> `uvicorn` (Ctrl+C, rerun the command above). Without a key, the AI Coach page still loads and
> replies with a friendly "no key set" message — everything else in the app works regardless.

## 3. Run the frontend

Open a **second** terminal (`` Ctrl+Shift+` ``), make sure it's back at the project root first:

```powershell
cd frontend
npm install
npm start
```

This opens `http://localhost:3000` automatically. It talks to the backend at
`http://localhost:8001` via `REACT_APP_BACKEND_URL` in `frontend/.env`.

## 4. Using the app

1. Go to `http://localhost:3000`, click **Create Account**, sign up with any name/email.
2. Complete onboarding (age, height, weight, activity, goal, diet) — computes your daily targets.
3. Try **Meal Builder** (drag ingredients onto the plate), **Food Scanner** (mock demo), **AI
   Coach** (needs the Anthropic key above), **Calendar**, and **Reports**.

All user/meal data lives in the browser's `localStorage` (`AuthContext.jsx`). MongoDB only stores
AI chat history and the `/api/status` demo endpoint.

## Troubleshooting

- **`ERROR: Could not find a version that satisfies the requirement emergentintegrations`** — you
  have an old copy of `requirements.txt`. This zip's version no longer references that package at
  all; re-download/re-extract and retry `pip install -r requirements.txt`.
- **`The token '&&' is not a valid statement separator`** — you're in PowerShell; run each command
  on its own line (or join with `;`) instead of `&&`.
- **`cd : Cannot find path ...\backend`** — you're not inside the folder that directly contains
  `backend`/`frontend`. Run `dir` (or `ls`) to check what's in your current folder first.
- **CORS errors in the browser console** — make sure the backend is actually running on port 8001
  and `backend/.env` has `CORS_ORIGINS="*"` (already set).
- **`npm install` fails on a Radix package version** — use Node 18 or 20 LTS.
- **Blank white screen** — check the browser console; almost always a missing `.env` value or the
  backend not running.
- **AI Coach replies "no ANTHROPIC_API_KEY is set"** — add your key to `backend/.env` and restart
  `uvicorn`.
