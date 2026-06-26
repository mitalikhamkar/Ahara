import { useState } from "react"
import {
  INGREDIENTS,
  calculateTotals,
  calculateMealScore,
  MEAL_TARGETS,
  findIngredient,
  formatAmount,
} from "../data/ingredientData"

// ─── Top Navigation Bar ──────────────────────────────────────────────────────
function TopNav({ onNav, onMenuClick }) {
  const links = [
    { label: "Dashboard", route: "toDashboard" },
    { label: "Meal Builder", route: null },
    { label: "History", route: null },
  ]
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex items-center justify-between px-4 md:px-6 py-3">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-9 h-9 -ml-1 rounded-full text-on-surface-variant hover:bg-surface-variant/50 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span
          className="font-jakarta text-headline-lg text-primary tracking-tight cursor-pointer"
          onClick={() => onNav?.toDashboard()}
        >
          Ahara
        </span>
        <nav className="hidden md:flex gap-6 ml-4">
          {links.map((link) => (
            <a
              key={link.label}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (link.route) onNav?.[link.route]()
              }}
              className={
                link.label === "Meal Builder"
                  ? "text-primary font-bold border-b-2 border-primary pb-0.5 transition-colors duration-200"
                  : "text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full font-label-md text-label-md hover:bg-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          <span className="hidden sm:inline">Scan Nutrition Label</span>
        </button>
        <div className="relative">
          <span className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-variant/50 rounded-full cursor-pointer transition-all">
            notifications
          </span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </div>
        <button
          type="button"
          onClick={() => onNav?.toDashboard()}
          className="flex items-center justify-center text-on-surface-variant p-2 hover:bg-surface-variant/50 rounded-full cursor-pointer transition-all"
          aria-label="Account"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  )
}

// ─── Sidebar Navigation ──────────────────────────────────────────────────────
function SideNav({ onNav, onSave, isOpen, onClose }) {
  const navItems = [
    { icon: "dashboard", label: "Dashboard", active: false, route: "toDashboard" },
    { icon: "restaurant_menu", label: "Meal Builder", active: true, route: null },
    { icon: "timeline", label: "Daily Timeline", active: false, route: null },
    { icon: "person", label: "Profile", active: false, route: null },
  ]

  const progressStats = [
    { label: "Avg Protein", value: "65g", pct: 75, color: "bg-primary-container" },
    { label: "Goal Completion", value: "88%", pct: 88, color: "bg-secondary" },
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-on-surface/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-surface-container-low shadow-md z-50 pt-20 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 mb-8 mt-4">
          <h2 className="font-jakarta text-headline-md text-primary">Ahara Visuals</h2>
          <p className="font-label-md text-label-md text-on-surface-variant">Nourish your day</p>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (item.route) onNav?.[item.route]()
                onClose?.()
              }}
              className={`mx-2 my-1 px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all ${
                item.active
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface-variant hover:bg-surface-variant/50"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 px-4 border-t border-outline-variant/30 pt-6">
          <p className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-wider mb-4 px-2">
            Weekly Progress
          </p>
          <div className="space-y-4 px-2">
            {progressStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between text-caption text-on-surface-variant mb-1">
                  <span>{stat.label}</span>
                  <span className="font-bold text-on-surface">{stat.value}</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${stat.color}`} style={{ width: `${stat.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-secondary text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="text-caption text-on-surface-variant">
                Consistency Score: <span className="font-bold text-on-surface">92</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto px-4 py-6">
          <button
            type="button"
            onClick={onSave}
            className="w-full bg-primary text-white font-label-md text-label-md py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Log Meal
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── Smart Suggester Tooltip ─────────────────────────────────────────────────
function SmartSuggester() {
  return (
    <div className="float-anim absolute top-4 left-4 md:top-10 md:left-10 z-30 max-w-[calc(100%-2rem)]">
      <div className="glass-card px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl flex items-center gap-3 md:gap-4 border border-primary/20">
        <div className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            lightbulb
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-label-md text-label-md text-primary font-bold whitespace-nowrap">Smart Suggester</p>
          <p className="font-body-md text-body-md text-on-surface-variant whitespace-nowrap">
            Low Protein → Add Eggs
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Plate item position helper ──────────────────────────────────────────────
function ringPosition(index, total) {
  if (total <= 1) return { top: "50%", left: "50%" }
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const radius = total <= 2 ? 22 : total <= 4 ? 28 : 32
  return { top: `${50 + radius * Math.sin(angle)}%`, left: `${50 + radius * Math.cos(angle)}%` }
}

const PLATE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDU8FbxiBkWacdfZXe55DO2JbkKfF7WfXVrCBCaLMaSQ6Jcs0txO8G6HSzG-FESTI49sLMSHFdhzbSs6zX922Mj-ItGdeOhkZO_xEMi7IxNlNsK_A-5mfa7IxqGQc3l2ivJ-vKIVvHDaGyuNvgscpCUKBhk3NHhhAtTRx0cA2Ejwz27FKIsKh3S3s2mDqPe7uC9MGLo3qb58FV88F7lLHTbPhUtSwZF9EKCXbzSDP2HHgdUgQjqIteePOFXdpnktaArd0YelYYpDBU"

// ─── Hero Plate Canvas ────────────────────────────────────────────────────────
function PlateCanvas({ platedItems, onUpdateQty, onAddIngredient }) {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div className="plate-container flex-1 flex items-center justify-center p-4 md:p-6 relative overflow-visible">
      <SmartSuggester />

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          const id = e.dataTransfer.getData("text/ahara-ingredient-id")
          if (id) onAddIngredient(id)
        }}
        className={`relative w-[88%] sm:w-[80%] max-w-[650px] aspect-square flex items-center justify-center rounded-full transition-shadow ${
          isDragOver ? "ring-4 ring-primary ring-offset-8 ring-offset-surface" : ""
        }`}
      >
        <img
          src={PLATE_IMAGE}
          alt="Plate"
          draggable={false}
          className="w-full h-full object-contain plate-3d rounded-full pointer-events-none select-none"
        />

        {platedItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-10">
            <p className="text-body-md text-center font-semibold text-on-surface-variant/60">
              Drag ingredients here to build your plate
            </p>
          </div>
        )}

        <div className="absolute inset-0 z-10">
          {platedItems.map((item) => {
            const ing = findIngredient(item.id)
            if (!ing) return null
            const idx = platedItems.indexOf(item)
            const pos = ringPosition(idx, platedItems.length)
            return (
              <div
                key={item.id}
                className="plated-chip absolute group cursor-grab active:cursor-grabbing"
                style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}
              >
                <div className="ingredient-chip bg-white/90 backdrop-blur-md rounded-2xl p-2 flex items-center gap-3 border border-white shadow-xl transition-all group-hover:scale-105 whitespace-nowrap">
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl border-2 border-white object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-on-surface">{ing.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, -ing.step)}
                        className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-fixed transition-colors text-[10px] font-bold text-on-surface-variant leading-none"
                      >
                        −
                      </button>
                      <span className="text-xs font-bold text-on-surface">{formatAmount(ing, item.amount)}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, ing.step)}
                        className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors text-[10px] font-bold leading-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Horizontal Ingredient Library ───────────────────────────────────────────
function IngredientLibrary({ onAddIngredient }) {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/ahara-ingredient-id", id)
    e.dataTransfer.effectAllowed = "copy"
  }

  return (
    <div className="w-full bg-white/50 backdrop-blur-lg border-t border-outline-variant/30 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 px-1 md:px-2">
        <h3 className="font-jakarta text-label-md uppercase tracking-widest text-on-surface-variant">
          Ingredient Library
        </h3>
        <span className="text-caption text-primary flex items-center gap-1 cursor-pointer hover:underline">
          View All
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </span>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide px-1 md:px-2">
        {INGREDIENTS.map((ing) => (
          <button
            key={ing.id}
            type="button"
            draggable
            onDragStart={(e) => handleDragStart(e, ing.id)}
            onClick={() => onAddIngredient(ing.id)}
            className="flex-shrink-0 group cursor-grab active:cursor-grabbing text-center bg-transparent border-none"
          >
            <div className="w-20 h-20 bg-surface-container rounded-2xl overflow-hidden mb-2 ring-2 ring-transparent group-hover:ring-primary transition-all shadow-sm">
              <img
                src={ing.image}
                alt={ing.name}
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform pointer-events-none"
              />
            </div>
            <span className="text-caption font-bold text-on-surface">{ing.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Meal Analytics Panel (right side) ───────────────────────────────────────
const SCORE_CIRC = 2 * Math.PI * 64

function scoreLabel(s) {
  if (s >= 85) return "Excellent Balance"
  if (s >= 65) return "Good Balance"
  if (s >= 40) return "Needs Adjustment"
  return "Far From Target"
}

function AnalyticsPanel({ totals, mealType, onMealTypeChange, onSave }) {
  const targets = MEAL_TARGETS[mealType]
  const score = calculateMealScore(totals, targets)
  const dashOffset = SCORE_CIRC * (1 - score / 100)
  const isGood = score >= 65

  const macroRows = [
    { key: "protein", label: "Protein", color: "bg-primary-container" },
    { key: "carbs", label: "Carbs", color: "bg-tertiary-container" },
    { key: "fat", label: "Fat", color: "bg-secondary-container" },
    { key: "fiber", label: "Fiber", color: "bg-secondary" },
  ]

  return (
    <aside className="w-full lg:w-80 xl:w-96 bg-surface-container-high p-6 md:p-8 flex flex-col border-l border-outline-variant/20 lg:h-screen lg:overflow-y-auto">
      <h2 className="font-jakarta text-headline-md text-on-surface mb-6 md:mb-8">Meal Analytics</h2>

      {/* Meal Score Gauge */}
      <div className="bg-white rounded-[32px] p-6 mb-6 md:mb-8 text-center shadow-lg border border-primary/10">
        <p className="font-label-md text-label-md text-on-surface-variant mb-4">Meal Score</p>
        <div className="relative inline-flex items-center justify-center mb-4">
          <svg width="144" height="144" className="transform -rotate-90">
            <circle cx="72" cy="72" r="64" fill="none" stroke="currentColor" strokeWidth="10" className="text-surface-container" />
            <circle
              cx="72"
              cy="72"
              r="64"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={SCORE_CIRC}
              strokeDashoffset={dashOffset}
              className="text-primary circular-progress"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-jakarta text-4xl text-primary font-extrabold leading-none">{score}</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">/ 100</span>
          </div>
        </div>
        <p className={`font-body-md text-body-md font-bold flex items-center justify-center gap-1 ${isGood ? "text-secondary" : "text-error"}`}>
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isGood ? "check_circle" : "cancel"}
          </span>
          {scoreLabel(score)}
        </p>
      </div>

      {/* Macro Breakdown */}
      <div className="space-y-4 md:space-y-6 flex-1">
        <div className="flex items-center justify-between px-1 -mb-2">
          <span className="text-label-md text-on-surface-variant font-semibold">Macro Breakdown</span>
          <span className="text-headline-md text-primary font-bold">
            {Math.round(totals.calories)}{" "}
            <span className="text-caption text-on-surface-variant font-normal">kcal</span>
          </span>
        </div>
        {macroRows.map((m) => {
          const target = targets[m.key] || 1
          const consumed = totals[m.key]
          const pct = Math.min(100, (consumed / target) * 100)
          const remaining = Math.max(0, Math.round(target - consumed))
          return (
            <div key={m.key} className="bg-white/50 rounded-2xl p-4 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${m.color}`} />
                  <span className="font-label-md text-label-md text-on-surface">{m.label}</span>
                </div>
                <span className="text-caption font-bold text-on-surface">
                  {Math.round(consumed)}g / {target}g
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden mb-2">
                <div className={`h-full rounded-full transition-all duration-500 ${m.color}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant uppercase tracking-tighter">
                <span>Consumed: {Math.round(consumed)}g</span>
                <span>Remaining: {remaining}g</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Meal Type + Save */}
      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-outline-variant/30">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {["Breakfast", "Lunch", "Dinner"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onMealTypeChange(t)}
              className={`px-3 py-3 rounded-xl text-caption font-bold transition-colors ${
                mealType === t
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-container-highest text-on-surface hover:bg-primary-fixed"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onSave}
          className="w-full bg-primary text-white font-jakarta text-headline-md text-base py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            save
          </span>
          Save Daily Log
        </button>
      </div>
    </aside>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const INITIAL_PLATED = [
  { id: "egg", amount: 2 },
  { id: "paneer", amount: 100 },
]

export default function MealBuilderpage({ onNav }) {
  const [platedItems, setPlatedItems] = useState(INITIAL_PLATED)
  const [mealType, setMealType] = useState("Lunch")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const totals = calculateTotals(platedItems)

  const handleAdd = (id) => {
    const ing = findIngredient(id)
    if (!ing) return
    setPlatedItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, amount: i.amount + ing.defaultAmount } : i))
      }
      return [...prev, { id, amount: ing.defaultAmount }]
    })
  }

  const handleUpdate = (id, delta) => {
    setPlatedItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, amount: i.amount + delta } : i)).filter((i) => i.amount > 0)
    )
  }

  const handleSave = () => {
    console.log("Logging meal:", { mealType, platedItems, totals })
    alert("✅ Meal logged successfully!")
  }

  return (
    <div className="bg-background min-h-screen font-sans">
      <TopNav onNav={onNav} onMenuClick={() => setSidebarOpen((v) => !v)} />

      <SideNav onNav={onNav} onSave={handleSave} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 pt-16 lg:h-screen flex flex-col lg:flex-row lg:overflow-hidden">
        {/* Plate Builder Section */}
        <section className="flex-1 flex flex-col relative bg-surface-container-lowest/30 min-h-[70vh] lg:min-h-0">
          <PlateCanvas platedItems={platedItems} onUpdateQty={handleUpdate} onAddIngredient={handleAdd} />
          <IngredientLibrary onAddIngredient={handleAdd} />
        </section>

        {/* Right: Analytics Panel */}
        <AnalyticsPanel totals={totals} mealType={mealType} onMealTypeChange={setMealType} onSave={handleSave} />
      </main>
    </div>
  )
}