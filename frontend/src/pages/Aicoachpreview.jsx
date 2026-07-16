// AICoachPreview.jsx
//
// A live-looking (but static/looped) chat interface used in the Landing
// page's AI Coach section. Presentational only — the "Chat with AI Coach"
// CTA click is handled by the parent via onChatClick so auth redirect logic
// stays in one place.

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const SCRIPT = [
  { from: 'user', text: 'How can I add more protein without more calories?' },
  { from: 'ai', typing: true },
  {
    from: 'ai',
    text: "Swap your afternoon toast for Greek yogurt with almonds — about +15g protein for the same 200 kcal.",
  },
  { from: 'ai', chips: ['Add to today', 'Show more swaps', 'Explain why'] },
];

const SUGGESTIONS = [
  'Suggest a 500-kcal breakfast',
  'Review my week',
  'Hit 120g protein today',
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-ahara-muted"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function AICoachPreview({ onChatClick }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delays = [900, 1400, 2200, 1600];
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % (SCRIPT.length + 1));
    }, delays[step % delays.length]);
    return () => clearTimeout(t);
  }, [step]);

  const visible = SCRIPT.slice(0, step);

  return (
    <div className="rounded-3xl bg-white border border-ahara-line p-6 shadow-[0_30px_60px_-30px_rgba(31,41,51,0.25)]" data-testid="ai-coach-preview">
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-ahara-line">
        <div className="w-8 h-8 rounded-full bg-ahara-sage/15 flex items-center justify-center">
          <Leaf className="w-4 h-4 text-ahara-sage" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium text-ahara-ink">Ahara Coach</p>
          <p className="text-[11px] text-ahara-muted flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-ahara-sage inline-block" /> Active now
          </p>
        </div>
      </div>

      <div className="space-y-3 min-h-[190px]">
        <AnimatePresence initial={false}>
          {visible.map((m, i) => {
            if (m.from === 'user') {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-ahara-ink/10 shrink-0" />
                  <div className="bg-ahara-mist rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-ahara-ink max-w-xs">
                    {m.text}
                  </div>
                </motion.div>
              );
            }
            if (m.typing) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3 justify-end"
                >
                  <div className="bg-ahara-mist rounded-2xl rounded-tr-sm"><TypingDots /></div>
                  <div className="w-8 h-8 rounded-full bg-ahara-sage/20 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-ahara-sage" />
                  </div>
                </motion.div>
              );
            }
            if (m.chips) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 justify-end pr-11"
                >
                  {m.chips.map((c) => (
                    <span key={c} className="text-xs rounded-full border border-ahara-line bg-white px-3 py-1.5 text-ahara-ink/80">
                      {c}
                    </span>
                  ))}
                </motion.div>
              );
            }
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-end"
              >
                <div className="bg-ahara-sage rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white max-w-[15rem]">
                  {m.text}
                </div>
                <div className="w-8 h-8 rounded-full bg-ahara-sage/20 flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 text-ahara-sage" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-5 pt-4 border-t border-ahara-line flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <span key={s} className="text-[11px] rounded-full bg-ahara-mist px-3 py-1 text-ahara-muted">
            {s}
          </span>
        ))}
      </div>

      <Button
        onClick={onChatClick}
        className="mt-5 w-full bg-ahara-ink hover:bg-ahara-ink/90 text-white rounded-full h-11"
        data-testid="chat-with-ai-coach-btn"
      >
        Chat with AI Coach <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}