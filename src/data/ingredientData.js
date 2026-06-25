// Nutrition database for every ingredient in the tray.
//
// type "count"  -> amount is a whole-number count (eggs, roti, banana, tbsp).
//                  macros below are PER ONE UNIT.
// type "weight" -> amount is grams/ml, shown with `unitLabel` (g/ml).
//                  macros below are PER `baseAmount` of that unit
//                  (e.g. paneer macros are per 100g, so a plate amount of
//                  150 scales macros by 150/100).

export const INGREDIENTS = [
  {
    id: "egg",
    name: "Egg",
    type: "count",
    unitLabel: "egg",
    unitLabelPlural: "eggs",
    step: 1,
    defaultAmount: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcDfDcovle7QiL1e6u3wd6sRgXvOw7nmvrQ2S3pFgluRinvP8QvCBd35JxWZlTQis4SkqcRRBmQPFmKKmYdAwBzlWz3x4xgv4yIW47lMUSKDArxuGlojViXK9ePNvHE5iDj55zOPaWO0Xe8m9k6XAE1zRe7IFnhPgpvc2hucTe7U_26mEsUN4pQQviSHpNnh34yzVdOIF4oSSY-GBBX26lSHlaY02MpA-ZuoyKR6GdET7WDSjcbdllJTaXDdDNNUTk3tBBFRZcwaY",
    macros: { protein: 6, carbs: 0.6, fat: 5, fiber: 0, calories: 70 },
  },
  {
    id: "milk",
    name: "Milk",
    type: "weight",
    unitLabel: "ml",
    baseAmount: 100,
    step: 50,
    defaultAmount: 100,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDx1p4Mxrw6_HNnlMY6fzaojN-NTonS7nfKrEsS3R35IeLylaLkc3VoEnm7GG-CCNH2hM0TfPnYACfHA8pa5DQ_eJrPrIUhCVqjwVbj7jaM3OlPlkDVkDMERgdk_few2bdUaQKaJGS3CFm4ldh-c-8bfKYcyt9Zhz-SYcdLLNieQrwCnzmOaKry7fi_Uphp1hk5y_-Mtm1Fs_RPyB9hQ2PBfJK5_yidxsYmK3E7dZpFPYyYdVCd4S2vag_Zqn8HUpoaHrYh8zJuLV4",
    macros: { protein: 3.4, carbs: 5, fat: 3.5, fiber: 0, calories: 65 },
  },
  {
    id: "paneer",
    name: "Paneer",
    type: "weight",
    unitLabel: "g",
    baseAmount: 100,
    step: 50,
    defaultAmount: 100,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwK-edPTq3Uj0j_1103K4CRpTw6_jVJOGy2eU1F0sAiiE9wT56GCdb9Q_lcUq6NneIl10fRkmicY6aDX2beZoyYK7FTpM5gRqDWXaIeEWBYEcr3LbazI2evSMjVtngM_v0Wxkfgr3A1KG77HqD44ZgmstHGNolECQks0RcI3VqFGt4PfbbkAdLLP_YC19Nvp4TyYvqOMJ8k9cyb_XK1HkOiMUc4BN6O1_gkNhW8G7P8ARcr2jobPJSub1gZB5VwW4x6iKGn-ayawk",
    macros: { protein: 18, carbs: 1.2, fat: 20, fiber: 0, calories: 265 },
  },
  {
    id: "chicken",
    name: "Chicken",
    type: "weight",
    unitLabel: "g",
    baseAmount: 100,
    step: 50,
    defaultAmount: 100,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3GtJwc15GjsvU39S-5dae4wEYQxUDxiW26AT8Tl95-S59Ymopvjl4TLbVdnqvCOWZ2-oDZo2zqL7-aaAae4kYAJ8SI06P7SgfhDoasWhxZ_lyI55-kcRWpJ3ddfePEBXlyAUuDyH_RroqicIa8XbojLa_ElN6VwGzksmiTwlobJShguwwp_eRB-GLLmhx7YqbwxjnYDbSQzvOg_QyAzCiIMM2pAjGuYeUNv5SOGEHa1yxx_4IC7AAvRGObCiCwUPSF6x5SGcqswA",
    macros: { protein: 31, carbs: 0, fat: 3.6, fiber: 0, calories: 165 },
  },
  {
    id: "rice",
    name: "Rice",
    type: "weight",
    unitLabel: "g",
    baseAmount: 100,
    step: 50,
    defaultAmount: 100,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAt61mDyW4_kUVEDNZC7yvjBpC9cHrbbde5eHd1IMq6-WnSUFSFzTpKnO63MHOD597s_40KVcVSPp2kMXQ40jJACgjS8v0b3WS4ldC163UtjyMD8-KVRBq0NrY039Onmx0Pzr7TUWqEVNKEFPMAT0lZ_btolrgZUkeHnVxKWJCb_tfcTWdd2EWTmbDAIzKlfXpb1lZQcSs4qeCivf0tVVnXr1j6RpWoVFTVYGwA7-sPSNtezC2tDHhgPKaPs9gi-QoIU-W9ZmZxez0",
    macros: { protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, calories: 130 },
  },
  {
    id: "roti",
    name: "Roti",
    type: "count",
    unitLabel: "roti",
    unitLabelPlural: "rotis",
    step: 1,
    defaultAmount: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBa9VtsAIwLmVia-cuucQ4Bo-QB-kSINyX1BkRYcUatZBmvFy45_NC6q0qH90noQueILBAHpiVwHvnVoK-cLzWG2mvH1JE2ESwLMK_sDpuwAu4l5c_SsVxFMqJU6c90FKQSWB0m4a5EYilr-x4xj-O-AZuDldvg638eix1WDoJ3pM5WkGvUL7Kib4p0AHVp7nM0lZWi4tkIYxSHVZT4mTTY_dCkUbLnenypMiccKvLpiAZzHdO_iK1VoBYlvp9DrwBPJJaY4gBJun8",
    macros: { protein: 3, carbs: 18, fat: 3, fiber: 2, calories: 120 },
  },
  {
    id: "oats",
    name: "Oats",
    type: "weight",
    unitLabel: "g",
    baseAmount: 40,
    step: 20,
    defaultAmount: 40,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSoeGy8muu9MwfjdK7juY9O8p4K_9sfs8x56eww6oK9F5Ua7VzkZm-jSLe-YyzMUE5OcUAlcR_QWH1I0q_qxqNj1QOTefOe9LSDe7vOx4bvzWi585am1zc_LsYnvA2g77ICCX_2fYL2rUHgKTt1lnzNDU1akTraAl1F71HFHHCwiwFzf-yMzM6kksJkfwhD4CwW9F4tXKRSrZfSw4YN6SDWaqL9IrLx2cr0RKQUwJVcguJt6V6xs3okn4y1EWcOxYCjbvljZHZpFA",
    macros: { protein: 5, carbs: 27, fat: 3, fiber: 4, calories: 150 },
  },
  {
    id: "banana",
    name: "Banana",
    type: "count",
    unitLabel: "banana",
    unitLabelPlural: "bananas",
    step: 1,
    defaultAmount: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARjQrUWMG9WuuHSxDxZuWv3ZaIrIOkSB-GTe7R5Rtn9eVKfp-UfmfglLVzLVUF9iCLmXc3J6vWhbcbB7OAB9nYPuIlWIvnUXyTEsI7ZE64nAMHwSjuruMj9PjcSMrcbMpXopSkWHeoyBicqQUdic41Bx9CBLlZvXT-rcQxSS0yC3ZQM_CcvYHcDBmEFKcR7rOwGTPcqhQULkPvwXchxQtcACK7vihNZyAQs0S767NCOs9HesSM5f6FTWND4tXEjjwAbyrG8CYy_N8",
    macros: { protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, calories: 105 },
  },
  {
    id: "curd",
    name: "Curd",
    type: "weight",
    unitLabel: "g",
    baseAmount: 100,
    step: 50,
    defaultAmount: 100,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxvXy_cxM1ki0woKEBzd_Cduf-GtTrVqmawPp1GqVjJ6QcatKld5w6qP3UNYaWy2Hwy4rlc-7MIzdaPw--uBWWX0yFny0YNr6y06xmOvER4yro-wu4yISeDd079cISPYy_0H3beEj1iX5tpmjYp4QjEzfMaN2MIzK16NWhmiX0diTxt0DLdM8zko4ZTzuupTUOD0pO2NHknw0jFdJOJ9lzeSjlwCuzGHyUYCdn0nnC2fj0Dr301METL5vefimqveRRMGD5jiDRctE",
    macros: { protein: 11, carbs: 3.4, fat: 4, fiber: 0, calories: 98 },
  },
  {
    id: "peanut-butter",
    name: "Peanut Butter",
    type: "count",
    unitLabel: "tbsp",
    unitLabelPlural: "tbsp",
    step: 1,
    defaultAmount: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFQu7JERI_F_8WAOT4aMiQMhi7OjmKS0jQ58YSKpe2nCCnKxTk0eANZzj0_f9zn9YqD2fV7aRTN8VMpOUtsvi7WIFxz2cSTBBURh5zJP0-S0j4KhN9WP5S3jti-O3Bt6eC-8AxmqYM-UpsBXgh5rjr7Y6rLkAlZqOOYhsNXNwg-yih414sslP4sSbbLHfmfDBU0EkO91MhdvkgPKAGb3VeMBH9_Ff90q4FJwQ12IqoF-N6T7_mcmIfh9_JjCuwl55R2ygNVjtDN1I",
    macros: { protein: 4, carbs: 3, fat: 8, fiber: 1, calories: 95 },
  },
];

export const findIngredient = (id) => INGREDIENTS.find((i) => i.id === id);

// Converts a plate "amount" into a multiplier on top of the per-unit macros.
export function macroFactor(ingredient, amount) {
  if (ingredient.type === "weight") {
    return amount / ingredient.baseAmount;
  }
  return amount;
}

export function formatAmount(ingredient, amount) {
  if (ingredient.type === "weight") {
    return `${amount}${ingredient.unitLabel}`;
  }
  const label = amount === 1 ? ingredient.unitLabel : ingredient.unitLabelPlural;
  return `${amount} ${label}`;
}

// Macro targets per meal type — drive the live progress bars + meal score.
export const MEAL_TARGETS = {
  Breakfast: { protein: 25, carbs: 45, fat: 15, fiber: 8 },
  Lunch: { protein: 45, carbs: 60, fat: 20, fiber: 12 },
  Dinner: { protein: 40, carbs: 50, fat: 18, fiber: 10 },
};

// Totals for whatever is currently on the plate.
export function calculateTotals(platedItems) {
  return platedItems.reduce(
    (totals, item) => {
      const ing = findIngredient(item.id);
      if (!ing) return totals;
      const factor = macroFactor(ing, item.amount);
      totals.protein += ing.macros.protein * factor;
      totals.carbs += ing.macros.carbs * factor;
      totals.fat += ing.macros.fat * factor;
      totals.fiber += ing.macros.fiber * factor;
      totals.calories += ing.macros.calories * factor;
      return totals;
    },
    { protein: 0, carbs: 0, fat: 0, fiber: 0, calories: 0 }
  );
}

// Rewards being close to target, penalizes being far over OR far under.
export function calculateMealScore(totals, targets) {
  const keys = ["protein", "carbs", "fat", "fiber"];
  const scores = keys.map((key) => {
    const target = targets[key] || 1;
    const pct = (totals[key] / target) * 100;
    return Math.max(0, 100 - Math.abs(100 - pct));
  });
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}
HeroVisual.jsx
Navbar.jsx
footer.jsx
mealbuilder
onboarding
IngredientTray.jsx
NutritionPanel.jsx
PlateCanvas.jsx
import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../context/UserContext'

/* ─── tiny helpers ─────────────────────────────────────────── */
const CircleProgress = ({ value, max, color, trackColor, size = 128, stroke = 8, children }) => {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / max) * circ
  const circleRef = useRef(null)

  useEffect(() => {
    if (!circleRef.current) return
    circleRef.current.style.strokeDashoffset = circ
    const t = setTimeout(() => { circleRef.current.style.strokeDashoffset = offset }, 300)
    return () => clearTimeout(t)
  }, [offset, circ])

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          ref={circleRef}
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={circ}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.9s ease-out' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  )
}

const NavItem = ({ icon, label, active, onClick, fill = false }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '12px 16px', margin: '2px 8px', borderRadius: '12px', width: 'calc(100% - 16px)',
    backgroundColor: active ? '#ff8a3d' : 'transparent',
    color: active ? '#682d00' : '#564338',
    border: 'none', cursor: 'pointer', textAlign: 'left',
    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px',
    transition: 'background 0.15s',
  }}
    onMouseOver={e => { if (!active) e.currentTarget.style.backgroundColor = 'rgba(232,225,218,0.5)' }}
    onMouseOut={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
  >
    <span className="material-symbols-outlined" style={{ fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0", fontSize: '22px' }}>{icon}</span>
    <span>{label}</span>
  </button>
)

/* ─── Main Dashboard ────────────────────────────────────────── */
const DashboardPage = ({ onLogout }) => {
  const { user } = useUser()
  const [activeNav, setActiveNav] = useState('dashboard')

import { useState } from 'react'
import WelcomePage from './pages/Welcomepage'
import CreateAccountPage from './pages/CreateAccountPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')

  if (currentPage === 'dashboard') return <DashboardPage onLogout={() => setCurrentPage('welcome')} />
  if (currentPage === 'create-account') return (
    <CreateAccountPage
      onBack={() => setCurrentPage('welcome')}
      onLoginClick={() => setCurrentPage('login')}
      onComplete={() => setCurrentPage('dashboard')}
    />
  )
  if (currentPage === 'login') return (
    <LoginPage
      onBack={() => setCurrentPage('welcome')}
      onCreateAccount={() => setCurrentPage('create-account')}
      onComplete={() => setCurrentPage('dashboard')}
    />
  )
  return (
    <WelcomePage
      onCreateAccount={() => setCurrentPage('create-account')}
      onLogin={() => setCurrentPage('login')}
    />
  )
}
}
export default App