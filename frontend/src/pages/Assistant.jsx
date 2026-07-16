import React, { useMemo, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Send, Leaf, Sparkles } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  'How can I increase my protein?',
  'Suggest a 500-calorie breakfast.',
  'Is paneer better than tofu for my goal?',
  "Review today's meals.",
];

function todaysKey() { return new Date().toISOString().slice(0, 10); }

export default function Assistant() {
  const { user, meals } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi ${user?.name || 'there'} — I'm Ahara, your nutrition coach. What are we working on today?` },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const sessionId = useMemo(() => `ahara_${user?.email || 'guest'}`, [user]);
  const listRef = useRef(null);

  const todaysNutrition = useMemo(() => {
    const t = { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    (meals[todaysKey()] || []).forEach(m => Object.keys(t).forEach(k => { t[k] += m.nutrition?.[k] || 0; }));
    return { ...t, targets: user?.targets };
  }, [meals, user]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput('');
    const nextMsgs = [...messages, { role: 'user', content }];
    setMessages(nextMsgs);
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/ai/chat`, {
        session_id: sessionId,
        message: content,
        profile: user ? {
          name: user.name, age: user.age, gender: user.gender,
          height_cm: user.height_cm, weight_kg: user.weight_kg,
          activity_level: user.activity_level, goal: user.goal, food_preference: user.food_preference,
        } : null,
        todays_nutrition: todaysNutrition,
        history: messages.slice(-6),
      });
      setMessages([...nextMsgs, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setMessages([...nextMsgs, { role: 'assistant', content: "I couldn't reach my nutrition brain just now. Try again in a moment." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 h-[calc(100vh-4rem)] flex flex-col" data-testid="assistant-page">
      <div>
        <div className="text-xs uppercase tracking-widest text-ahara-sage">AI Coach</div>
        <h1 className="font-heading text-4xl text-ahara-ink mt-1">Ask anything nutrition</h1>
        <p className="text-ahara-muted mt-1">Grounded in your profile & today's meals. Not medical advice.</p>
      </div>

      <div ref={listRef} className="flex-1 mt-6 overflow-y-auto space-y-4 pr-1" data-testid="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-ahara-sage/15 grid place-items-center shrink-0"><Leaf className="w-4 h-4 text-ahara-sage" /></div>
            )}
            <div className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-ahara-ink text-white rounded-tr-sm' : 'bg-white border border-ahara-line text-ahara-ink rounded-tl-sm'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-ahara-sage/15 grid place-items-center"><Leaf className="w-4 h-4 text-ahara-sage" /></div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-ahara-line text-ahara-muted text-sm">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ahara-sage animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-ahara-sage animate-pulse [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-ahara-sage animate-pulse [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)} className="text-xs px-3 py-1.5 rounded-full bg-white border border-ahara-line hover:bg-ahara-mist text-ahara-ink transition-colors" data-testid={`suggestion-${s.slice(0,20)}`}>
              <Sparkles className="w-3 h-3 inline mr-1 text-ahara-sage" /> {s}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder="Ask your coach…"
          className="h-12"
          data-testid="chat-input"
        />
        <Button onClick={() => send()} disabled={busy || !input.trim()} className="h-12 px-5 rounded-full bg-ahara-sage hover:bg-ahara-sage-dark text-white" data-testid="chat-send-btn">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
