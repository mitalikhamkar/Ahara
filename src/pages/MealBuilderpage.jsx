import { useState } from "react"
import { INGREDIENTS, calculateTotals, calculateMealScore, MEAL_TARGETS, findIngredient, formatAmount } from "../data/ingredientData"

// ─── Ingredient Tray ────────────────────────────────────────────────────────
function IngredientTray({ onAddIngredient }) {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/ahara-ingredient-id", id)
    e.dataTransfer.effectAllowed = "copy"
  }
  return (
    <div style={{ width:'100%', backgroundColor:'rgba(255,255,255,0.6)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(221,193,179,0.3)', padding:'16px 20px 12px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
        <h3 style={{ fontSize:'11px', fontWeight:700, color:'#564338', textTransform:'uppercase', letterSpacing:'0.1em', margin:0 }}>
          Ingredient Library
        </h3>
        <span style={{ fontSize:'12px', color:'#564338', display:'flex', alignItems:'center', gap:'4px' }}>
          Drag down to the plate
          <span className="material-symbols-outlined" style={{ fontSize:'16px' }}>south</span>
        </span>
      </div>
      <div style={{ display:'flex', gap:'12px', overflowX:'auto', paddingBottom:'4px' }}>
        {INGREDIENTS.map(ing => (
          <button key={ing.id} type="button" draggable
            onDragStart={e => handleDragStart(e, ing.id)}
            onClick={() => onAddIngredient(ing.id)}
            style={{ flexShrink:0, background:'none', border:'none', cursor:'grab', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', padding:'4px 0' }}
          >
            <div style={{ width:'80px', height:'80px', borderRadius:'16px', overflow:'hidden', border:'2px solid transparent', transition:'border-color 0.2s', boxShadow:'0 2px 8px rgba(0,0,0,0.10)' }}
              onMouseOver={e => e.currentTarget.style.borderColor='#9a4600'}
              onMouseOut={e => e.currentTarget.style.borderColor='transparent'}
            >
              <img src={ing.image} alt={ing.name} draggable={false} style={{ width:'100%', height:'100%', objectFit:'cover', pointerEvents:'none' }}/>
            </div>
            <span style={{ fontSize:'12px', fontWeight:600, color:'#1e1b17', whiteSpace:'nowrap' }}>{ing.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Plate Canvas ────────────────────────────────────────────────────────────
const PLATE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDU8FbxiBkWacdfZXe55DO2JbkKfF7WfXVrCBCaLMaSQ6Jcs0txO8G6HSzG-FESTI49sLMSHFdhzbSs6zX922Mj-ItGdeOhkZO_xEMi7IxNlNsK_A-5mfa7IxqGQc3l2ivJ-vKIVvHDaGyuNvgscpCUKBhk3NHhhAtTRx0cA2Ejwz27FKIsKh3S3s2mDqPe7uC9MGLo3qb58FV88F7lLHTbPhUtSwZF9EKCXbzSDP2HHgdUgQjqIteePOFXdpnktaArd0YelYYpDBU"

function ringPosition(index, total) {
  if (total <= 1) return { top:'50%', left:'50%' }
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const radius = total <= 2 ? 22 : total <= 4 ? 28 : 32
  return { top:`${50 + radius * Math.sin(angle)}%`, left:`${50 + radius * Math.cos(angle)}%` }
}

function PlateCanvas({ platedItems, onUpdateQty, onAddIngredient }) {
  const [isDragOver, setIsDragOver] = useState(false)
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'20px 24px', position:'relative', overflow:'hidden' }}>
      {/* Smart Suggester */}
      <div style={{ position:'absolute', top:'20px', left:'24px', zIndex:30, backgroundColor:'white', borderRadius:'20px', padding:'12px 18px', display:'flex', alignItems:'center', gap:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.10)' }}>
        <div style={{ width:'40px', height:'40px', borderRadius:'50%', backgroundColor:'rgba(255,138,61,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span className="material-symbols-outlined" style={{ color:'#9a4600', fontSize:'20px', fontVariationSettings:"'FILL' 1" }}>lightbulb</span>
        </div>
        <div>
          <p style={{ fontSize:'13px', fontWeight:700, color:'#9a4600', margin:'0 0 2px' }}>Smart Suggester</p>
          <p style={{ fontSize:'12px', color:'#564338', margin:0 }}>Low Protein → Add Eggs</p>
        </div>
      </div>

      {/* Plate drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={e => { e.preventDefault(); setIsDragOver(false); const id = e.dataTransfer.getData("text/ahara-ingredient-id"); if(id) onAddIngredient(id) }}
        style={{ position:'relative', width:'min(85%, 600px)', aspectRatio:'1/1', borderRadius:'50%', outline: isDragOver ? '4px solid #9a4600' : 'none', outlineOffset:'8px', transition:'outline 0.2s', marginTop:'16px' }}
      >
        <img src={PLATE_IMAGE} alt="Plate" style={{ width:'100%', height:'100%', objectFit:'contain', borderRadius:'50%', pointerEvents:'none', display:'block' }}/>
        {platedItems.length === 0 && (
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
            <p style={{ fontSize:'14px', fontWeight:600, color:'rgba(86,67,56,0.5)', textAlign:'center', padding:'0 40px' }}>Drag ingredients here to build your plate</p>
          </div>
        )}
        {/* Items on plate */}
        <div style={{ position:'absolute', inset:0 }}>
          {platedItems.map((item, idx) => {
            const ing = findIngredient(item.id)
            if (!ing) return null
            const pos = ringPosition(idx, platedItems.length)
            return (
              <div key={item.id} style={{ position:'absolute', top:pos.top, left:pos.left, transform:'translate(-50%,-50%)', zIndex:10 }}>
                <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(8px)', borderRadius:'16px', padding:'8px 12px', display:'flex', alignItems:'center', gap:'10px', boxShadow:'0 4px 20px rgba(0,0,0,0.18)', border:'1px solid rgba(255,255,255,0.8)', whiteSpace:'nowrap' }}>
                  <img src={ing.image} alt={ing.name} style={{ width:'48px', height:'48px', borderRadius:'10px', objectFit:'cover', border:'2px solid white', flexShrink:0 }}/>
                  <div>
                    <p style={{ fontSize:'12px', fontWeight:700, color:'#1e1b17', margin:'0 0 4px' }}>{ing.name}</p>
                    <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                      <button onClick={() => onUpdateQty(item.id, -ing.step)} style={{ width:'20px', height:'20px', borderRadius:'50%', border:'none', backgroundColor:'#f4ede5', cursor:'pointer', fontSize:'14px', fontWeight:700, color:'#564338', display:'flex', alignItems:'center', justifyContent:'center', lineHeight:1 }}>−</button>
                      <span style={{ fontSize:'12px', fontWeight:700, color:'#1e1b17' }}>{formatAmount(ing, item.amount)}</span>
                      <button onClick={() => onUpdateQty(item.id, ing.step)} style={{ width:'20px', height:'20px', borderRadius:'50%', border:'none', backgroundColor:'#9a4600', cursor:'pointer', fontSize:'14px', fontWeight:700, color:'white', display:'flex', alignItems:'center', justifyContent:'center', lineHeight:1 }}>+</button>
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

// ─── Nutrition Panel ──────────────────────────────────────────────────────────
const SCORE_CIRC = 402
function scoreLabel(s) {
  if (s >= 85) return 'Excellent Balance'
  if (s >= 65) return 'Good Balance'
  if (s >= 40) return 'Needs Adjustment'
  return 'Far From Target'
}

function NutritionPanel({ totals, mealType, onMealTypeChange, onSave }) {
  const targets = MEAL_TARGETS[mealType]
  const score = calculateMealScore(totals, targets)
  const dashOffset = SCORE_CIRC * (1 - score / 100)
  const macroRows = [
    { key:'protein', label:'Protein', color:'#9a4600' },
    { key:'carbs', label:'Carbs', color:'#d9a000' },
    { key:'fat', label:'Fat', color:'#91c47f' },
    { key:'fiber', label:'Fiber', color:'#006e1c' },
  ]
  return (
    <aside style={{ width:'320px', flexShrink:0, backgroundColor:'#eee7df', padding:'24px', display:'flex', flexDirection:'column', borderRight:'1px solid rgba(221,193,179,0.2)', height:'100%', overflowY:'auto' }}>
      <h2 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'22px', fontWeight:700, color:'#1e1b17', margin:'0 0 20px' }}>Meal Analytics</h2>

      {/* Plate Photo */}
      <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'16px', marginBottom:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
        <p style={{ fontSize:'13px', fontWeight:600, color:'#564338', margin:'0 0 12px' }}>Plate Photo</p>
        <div style={{ border:'2px dashed #ddc1b3', borderRadius:'14px', padding:'24px 16px', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', cursor:'pointer' }}
          onMouseOver={e => e.currentTarget.style.borderColor='#9a4600'}
          onMouseOut={e => e.currentTarget.style.borderColor='#ddc1b3'}
        >
          <span className="material-symbols-outlined" style={{ fontSize:'32px', color:'#8a7266' }}>photo_camera</span>
          <p style={{ fontSize:'13px', color:'#8a7266', margin:0, textAlign:'center' }}>Capture or Upload Plate</p>
        </div>
      </div>

      {/* Meal Score */}
      <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px', marginBottom:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
        <p style={{ fontSize:'13px', fontWeight:600, color:'#564338', margin:'0 0 16px' }}>Meal Score</p>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ position:'relative', width:'120px', height:'120px' }}>
            <svg width="120" height="120" style={{ transform:'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="64" fill="none" stroke="#eee7df" strokeWidth="10"/>
              <circle cx="60" cy="60" r="64" fill="none" stroke="#9a4600" strokeWidth="10"
                strokeDasharray={SCORE_CIRC} strokeDashoffset={dashOffset} strokeLinecap="round"
                style={{ transition:'stroke-dashoffset 0.6s ease-out' }}/>
            </svg>
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'28px', fontWeight:800, color:'#9a4600' }}>{score}</span>
              <span style={{ fontSize:'11px', color:'#564338' }}>/ 100</span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginTop:'10px' }}>
            <span className="material-symbols-outlined" style={{ fontSize:'16px', color: score>=65?'#006e1c':'#ba1a1a', fontVariationSettings:"'FILL' 1" }}>{score>=65?'check_circle':'cancel'}</span>
            <span style={{ fontSize:'13px', fontWeight:600, color: score>=65?'#006e1c':'#ba1a1a' }}>{scoreLabel(score)}</span>
          </div>
        </div>
      </div>

      {/* Macro Bars */}
      <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px', marginBottom:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
          <p style={{ fontSize:'13px', fontWeight:600, color:'#564338', margin:0 }}>Macro Breakdown</p>
          <span style={{ fontSize:'20px', fontWeight:700, color:'#9a4600' }}>
            {Math.round(totals.calories)} <span style={{ fontSize:'12px', color:'#564338', fontWeight:400 }}>kcal</span>
          </span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {macroRows.map(m => {
            const pct = Math.min(100, (totals[m.key] / (targets[m.key] || 1)) * 100)
            return (
              <div key={m.key}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#564338', marginBottom:'4px' }}>
                  <span style={{ fontWeight:600 }}>{m.label}</span>
                  <span>{Math.round(totals[m.key])}g <span style={{ color:'#8a7266' }}>/ {targets[m.key]}g</span></span>
                </div>
                <div style={{ height:'6px', backgroundColor:'#f4ede5', borderRadius:'99px', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, backgroundColor:m.color, borderRadius:'99px', transition:'width 0.4s ease-out' }}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Meal Type + Save */}
      <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
        <p style={{ fontSize:'13px', fontWeight:600, color:'#564338', margin:'0 0 10px' }}>Meal Type</p>
        <div style={{ display:'flex', gap:'6px', marginBottom:'14px' }}>
          {['Breakfast','Lunch','Dinner'].map(t => (
            <button key={t} onClick={() => onMealTypeChange(t)} style={{ flex:1, padding:'8px 4px', borderRadius:'10px', fontSize:'11px', fontWeight:600, border:'1.5px solid', borderColor: mealType===t?'#9a4600':'#ddc1b3', backgroundColor: mealType===t?'#9a4600':'white', color: mealType===t?'white':'#564338', cursor:'pointer', transition:'all 0.15s' }}>{t}</button>
          ))}
        </div>
        <button onClick={onSave} style={{ width:'100%', padding:'13px', borderRadius:'12px', backgroundColor:'#9a4600', color:'white', border:'none', cursor:'pointer', fontWeight:700, fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize:'18px' }}>save</span>
          Log This Meal
        </button>
      </div>
    </aside>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const INITIAL_PLATED = [
  { id:'egg', amount:2 },
  { id:'paneer', amount:100 },
]

export default function MealBuilderpage({ onNav }) {
  const [platedItems, setPlatedItems] = useState(INITIAL_PLATED)
  const [mealType, setMealType] = useState('Lunch')
  const totals = calculateTotals(platedItems)

  const handleAdd = (id) => {
    const ing = findIngredient(id)
    if (!ing) return
    setPlatedItems(prev => {
      const ex = prev.find(i => i.id === id)
      if (ex) return prev.map(i => i.id===id ? {...i, amount:i.amount+ing.defaultAmount} : i)
      return [...prev, { id, amount:ing.defaultAmount }]
    })
  }

  const handleUpdate = (id, delta) => {
    setPlatedItems(prev =>
      prev.map(i => i.id===id ? {...i, amount:i.amount+delta} : i).filter(i => i.amount > 0)
    )
  }

  const handleSave = () => {
    console.log('Logging meal:', { mealType, platedItems, totals })
    alert('✅ Meal logged successfully!')
  }

  return (
    <div style={{ backgroundColor:'#fff8f1', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      {/* Top Nav */}
      <header style={{ position:'fixed', top:0, width:'100%', zIndex:50, backgroundColor:'rgba(255,248,241,0.9)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(221,193,179,0.3)', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'32px' }}>
          <span style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'22px', fontWeight:800, color:'#9a4600', cursor:'pointer' }} onClick={()=>onNav?.toDashboard()}>Ahara</span>
          <div style={{ display:'flex', gap:'24px' }}>
            {[['Dashboard','toDashboard'],['Meal Builder',null],['History',null]].map(([label,route])=>(
              <a key={label} href="#" onClick={e=>{e.preventDefault();if(route&&onNav)onNav[route]()}} style={{ fontSize:'14px', fontWeight: label==='Meal Builder'?700:500, color: label==='Meal Builder'?'#9a4600':'#564338', textDecoration:'none', borderBottom: label==='Meal Builder'?'2px solid #9a4600':'none', paddingBottom:'2px', transition:'color 0.15s' }}>{label}</a>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <button style={{ display:'flex', alignItems:'center', gap:'8px', backgroundColor:'rgba(154,70,0,0.10)', color:'#9a4600', padding:'8px 16px', borderRadius:'50px', border:'none', cursor:'pointer', fontWeight:600, fontSize:'13px' }}>
            <span className="material-symbols-outlined" style={{ fontSize:'18px' }}>photo_camera</span>
            Scan Nutrition Label
          </button>
          <button style={{ background:'none', border:'none', cursor:'pointer', color:'#564338', position:'relative', display:'flex', padding:'8px' }}>
            <span className="material-symbols-outlined">notifications</span>
            <span style={{ position:'absolute', top:'8px', right:'8px', width:'8px', height:'8px', backgroundColor:'#9a4600', borderRadius:'50%' }}/>
          </button>
          <button onClick={()=>onNav?.toDashboard()} style={{ background:'none', border:'none', cursor:'pointer', color:'#564338', display:'flex', padding:'8px' }}>
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside style={{ position:'fixed', left:0, top:0, bottom:0, width:'256px', backgroundColor:'#f9f3eb', display:'flex', flexDirection:'column', paddingTop:'72px', zIndex:40, boxShadow:'1px 0 12px rgba(0,0,0,0.06)' }}>
        <div style={{ padding:'24px 24px 20px' }}>
          <h2 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'18px', fontWeight:800, color:'#9a4600', margin:0 }}>Ahara Visuals</h2>
          <p style={{ fontSize:'12px', color:'#564338', margin:'2px 0 0' }}>Nourish your day</p>
        </div>
        <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:'2px' }}>
          {[
            ['dashboard','Dashboard',false,'toDashboard'],
            ['restaurant_menu','Meal Builder',true,null],
            ['timeline','Daily Timeline',false,null],
            ['person','Profile',false,null],
          ].map(([icon,label,active,route])=>(
            <button key={label} onClick={()=>route&&onNav?.[route]()} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px', margin:'1px 8px', borderRadius:'12px', backgroundColor: active?'#ff8a3d':'transparent', color: active?'#682d00':'#564338', border:'none', cursor:'pointer', fontSize:'14px', fontWeight:600, textAlign:'left', width:'calc(100% - 16px)', transition:'background 0.15s' }}
              onMouseOver={e=>{if(!active)e.currentTarget.style.backgroundColor='rgba(232,225,218,0.5)'}}
              onMouseOut={e=>{if(!active)e.currentTarget.style.backgroundColor='transparent'}}
            >
              <span className="material-symbols-outlined" style={{ fontSize:'22px', fontVariationSettings: active?"'FILL' 1":"'FILL' 0" }}>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* Weekly Progress */}
        <div style={{ padding:'16px 24px', borderTop:'1px solid rgba(221,193,179,0.3)' }}>
          <p style={{ fontSize:'10px', fontWeight:700, color:'#564338', textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 12px' }}>Weekly Progress</p>
          {[['Avg Protein','65g',75,'#ff8a3d'],['Goal Completion','88%',88,'#006e1c']].map(([label,val,pct,color])=>(
            <div key={label} style={{ marginBottom:'10px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#564338', marginBottom:'3px' }}>
                <span>{label}</span><span style={{ fontWeight:700 }}>{val}</span>
              </div>
              <div style={{ height:'5px', backgroundColor:'#e8e1da', borderRadius:'99px', overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${pct}%`, backgroundColor:color, borderRadius:'99px' }}/>
              </div>
            </div>
          ))}
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginTop:'8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize:'18px', color:'#006e1c', fontVariationSettings:"'FILL' 1" }}>stars</span>
            <span style={{ fontSize:'12px', color:'#564338' }}>Consistency Score: <strong style={{ color:'#1e1b17' }}>92</strong></span>
          </div>
        </div>

        <div style={{ padding:'16px 24px' }}>
          <button onClick={handleSave} style={{ width:'100%', backgroundColor:'#9a4600', color:'white', border:'none', cursor:'pointer', borderRadius:'14px', padding:'14px', fontWeight:700, fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', boxShadow:'0 4px 16px rgba(154,70,0,0.25)' }}>
            <span className="material-symbols-outlined" style={{ fontSize:'20px' }}>add</span>
            Log Meal
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft:'256px', paddingTop:'64px', height:'100vh', display:'flex', flexDirection:'row', overflow:'hidden' }}>
        {/* Nutrition Panel */}
        <NutritionPanel totals={totals} mealType={mealType} onMealTypeChange={setMealType} onSave={handleSave}/>

        {/* Plate Section */}
        <section style={{ flex:1, display:'flex', flexDirection:'column', backgroundColor:'rgba(255,248,241,0.4)', overflow:'hidden' }}>
          <IngredientTray onAddIngredient={handleAdd}/>
          <PlateCanvas platedItems={platedItems} onUpdateQty={handleUpdate} onAddIngredient={handleAdd}/>
        </section>
      </main>
    </div>
  )
}