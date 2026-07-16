// HeroMealPreview.jsx
//
// Hero visual for the Landing page: a real top-down plate photo that slowly
// and continuously rotates, surrounded by fixed floating "pill" badges
// (Calories / Protein / Carbs / Healthy Fat / Fiber / Iron + an "AI
// Analyzing" indicator) — matching the reference composition.
//
// >>> TO REPLACE WITH A REAL ROTATING 3D PLATE LATER <<<
// Swap PLATE_IMG for your own asset, or replace the entire
// <div className="plate-disc ..."> block with a <Canvas>/<model-viewer>
// element. Keep the outer `.hero-stage` wrapper and the <NutrientBadge />
// list as-is — their positions are relative to the stage, not the plate.

import React from 'react';
import { motion } from 'framer-motion';

const PLATE_IMG = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85';

const BADGES = [
  { label: 'Calories', value: '320', dot: '#6FA67A', top: '4%', left: '-4%', delay: 0 },
  { label: 'Protein', value: '37.8g', dot: '#3B82F6', top: '2%', right: '-2%', delay: 0.5 },
  { label: 'Iron', value: '2.1mg', dot: '#A855F7', bottom: '26%', left: '-10%', delay: 1 },
  { label: 'Fiber', value: '8.4g', dot: '#6FA67A', bottom: '4%', left: '4%', delay: 1.5 },
  { label: 'Carbs', value: '42g', dot: '#F5811F', bottom: '26%', right: '-8%', delay: 0.8 },
  { label: 'Healthy Fat', value: '22g', dot: '#E8B93F', bottom: '4%', right: '2%', delay: 2 },
];

function NutrientBadge({ label, value, dot, delay, ...pos }) {
  return (
    <motion.div
      className="absolute bg-white rounded-full pl-3 pr-4 py-2 flex items-center gap-2 shadow-[0_16px_32px_-14px_rgba(31,41,51,0.28)] border border-ahara-line/60"
      style={{ ...pos }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 5, delay, repeat: Infinity, ease: 'easeInOut' },
      }}
      data-testid={`nutrient-badge-${label.toLowerCase().replace(/\s/g, '-')}`}
    >
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
      <span className="leading-tight whitespace-nowrap">
        <span className="block text-[9px] uppercase tracking-wide text-ahara-muted">{label}</span>
        <span className="block text-sm font-semibold text-ahara-ink">{value}</span>
      </span>
    </motion.div>
  );
}

function AiAnalyzingBadge() {
  return (
    <motion.div
      className="absolute top-[0%] left-1/2 -translate-x-1/2 bg-white rounded-full pl-2.5 pr-4 py-1.5 flex items-center gap-2 shadow-[0_16px_32px_-14px_rgba(31,41,51,0.28)] border border-ahara-line/60"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      data-testid="nutrient-badge-ai-analyzing"
    >
      <span className="relative flex w-2 h-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-ahara-sage opacity-60 animate-ping" />
        <span className="relative inline-flex rounded-full w-2 h-2 bg-ahara-sage" />
      </span>
      <span className="text-xs font-medium text-ahara-ink">AI Analyzing</span>
    </motion.div>
  );
}

export default function HeroMealPreview() {
  return (
    <div className="hero-stage relative w-full h-[520px] sm:h-[580px] flex items-center justify-center">
      <div
        className="absolute inset-0 hero-orb"
        style={{ background: 'radial-gradient(closest-side, rgba(111,166,122,0.28), transparent 70%)' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative w-[64%] max-w-[380px] aspect-square"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Rotating plate disc — badges below live outside this element so they stay upright */}
        <div
          className="plate-disc absolute inset-0 rounded-full overflow-hidden ring-[10px] ring-white shadow-[0_40px_80px_-30px_rgba(31,41,51,0.35)]"
          data-testid="hero-meal-preview"
        >
          <img
            src={PLATE_IMG}
            alt="A balanced plate of grilled protein, greens, whole grains and fruit, viewed from above"
            className="w-full h-full object-cover spin-slow"
          />
        </div>

        <AiAnalyzingBadge />
        {BADGES.map((b) => (
          <NutrientBadge key={b.label} {...b} />
        ))}
      </motion.div>
    </div>
  );
}