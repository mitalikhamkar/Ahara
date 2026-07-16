// FeatureIllustrations.jsx
//
// Small custom SVG illustrations for the Features section — deliberately
// abstract line-art in the Ahara palette so cards never rely on stock
// photography or generic lucide icons.

import React from 'react';

export function MealBuilderIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Building a meal by dragging food onto a plate">
      <defs>
        <linearGradient id="mb-plate" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0EFE9" />
        </linearGradient>
      </defs>
      <circle cx="130" cy="120" r="72" fill="url(#mb-plate)" stroke="#E5E7EB" strokeWidth="1.5" />
      <circle cx="130" cy="120" r="50" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 5" />
      <path d="M100 130c8-18 30-24 44-12" fill="none" stroke="#6FA67A" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
      <circle cx="150" cy="105" r="16" fill="#C8A97E" opacity="0.9" />
      <circle cx="112" cy="98" r="10" fill="#D98E7A" opacity="0.9" />
      <g className="mb-drag" style={{ transformOrigin: '235px 60px' }}>
        <rect x="216" y="42" width="38" height="38" rx="10" fill="#7EA8D9" opacity="0.15" stroke="#7EA8D9" strokeWidth="1.5" />
        <circle cx="235" cy="61" r="9" fill="#7EA8D9" />
        <path d="M235 76 L235 108 L172 128" fill="none" stroke="#7EA8D9" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
      </g>
      <style>{`
        .mb-drag { animation: mb-move 3.2s cubic-bezier(0.45,0,0.55,1) infinite; }
        @keyframes mb-move {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(-14px, 10px); }
        }
      `}</style>
    </svg>
  );
}

export function ScannerIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Scanning a food package for nutrition information">
      <rect x="118" y="30" width="84" height="160" rx="16" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <rect x="132" y="52" width="56" height="34" rx="4" fill="#F3F5F2" stroke="#E5E7EB" strokeWidth="1" />
      <rect x="132" y="96" width="56" height="6" rx="3" fill="#E5E7EB" />
      <rect x="132" y="108" width="40" height="6" rx="3" fill="#E5E7EB" />
      <rect x="132" y="120" width="48" height="6" rx="3" fill="#E5E7EB" />
      <rect x="118" y="30" width="84" height="160" rx="16" fill="none" stroke="#1F2933" strokeOpacity="0.06" strokeWidth="10" />
      <line x1="112" y1="70" x2="208" y2="70" stroke="#6FA67A" strokeWidth="3" strokeLinecap="round" className="scan-line" />
      <g opacity="0.9">
        <circle cx="230" cy="150" r="22" fill="#6FA67A" opacity="0.12" />
        <path d="M221 150l6 6 12-13" fill="none" stroke="#6FA67A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <style>{`
        .scan-line { animation: scan-move 2.4s ease-in-out infinite; }
        @keyframes scan-move {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(90px); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}

export function AnalyticsIllustration() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" role="img" aria-label="Nutrition trends chart over time">
      <rect x="40" y="34" width="240" height="152" rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <g stroke="#E5E7EB" strokeWidth="1">
        <line x1="40" y1="90" x2="280" y2="90" />
        <line x1="40" y1="138" x2="280" y2="138" />
      </g>
      <path
        d="M56 150 C 90 130, 100 160, 130 120 S 190 70, 220 90 S 260 60, 264 50"
        fill="none"
        stroke="#6FA67A"
        strokeWidth="3.5"
        strokeLinecap="round"
        pathLength="1"
        className="chart-line"
      />
      <g fill="#6FA67A">
        <circle cx="130" cy="120" r="4" />
        <circle cx="220" cy="90" r="4" />
        <circle cx="264" cy="50" r="5" />
      </g>
      <g>
        <rect x="56" y="164" width="10" height="14" rx="2" fill="#C8A97E" opacity="0.8" />
        <rect x="76" y="158" width="10" height="20" rx="2" fill="#7EA8D9" opacity="0.8" />
        <rect x="96" y="168" width="10" height="10" rx="2" fill="#6FA67A" opacity="0.8" />
      </g>
      <style>{`
        .chart-line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.8s cubic-bezier(0.16,1,0.3,1) forwards; animation-iteration-count: 1; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
      `}</style>
    </svg>
  );
}