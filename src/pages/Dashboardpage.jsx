import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../context/UserContext'

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
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke}/>
        <circle ref={circleRef} cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={circ} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.9s ease-out' }}/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>{children}</div>
    </div>
  )
}

const NavItem = ({ icon, label, active, onClick, fill=false }) => (
  <button onClick={onClick} style={{
    display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px',
    margin:'2px 8px', borderRadius:'12px', width:'calc(100% - 16px)',
    backgroundColor: active ? '#ff8a3d' : 'transparent',
    color: active ? '#682d00' : '#564338',
    border:'none', cursor:'pointer', textAlign:'left',
    fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:'14px', transition:'background 0.15s'
  }}
    onMouseOver={e=>{ if(!active) e.currentTarget.style.backgroundColor='rgba(232,225,218,0.5)' }}
    onMouseOut={e=>{ if(!active) e.currentTarget.style.backgroundColor='transparent' }}
  >
    <span className="material-symbols-outlined" style={{ fontVariationSettings: fill?"'FILL' 1":"'FILL' 0", fontSize:'22px' }}>{icon}</span>
    <span>{label}</span>
  </button>
)

const DashboardPage = ({ onLogout, onNav }) => {
  const { user } = useUser()
  const [activeNav, setActiveNav] = useState('dashboard')
  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'Sarah'
  const goalLabels = { 'gain-muscle':'Gain Muscle','lose-weight':'Lose Weight','maintain-weight':'Maintain Weight','improve-health':'Improve Health' }

  const handleNav = (key) => {
    setActiveNav(key)
    if (key === 'meal' && onNav) onNav.toMealBuilder()
  }

  return (
    <div style={{ backgroundColor:'#fff8f1', minHeight:'100vh', fontFamily:'Inter, sans-serif' }}>
      <aside style={{ position:'fixed', left:0, top:0, bottom:0, width:'256px', backgroundColor:'#f9f3eb', display:'flex', flexDirection:'column', paddingTop:'24px', paddingBottom:'24px', zIndex:50, boxShadow:'1px 0 12px rgba(0,0,0,0.06)' }}>
        <div style={{ padding:'0 24px 48px' }}>
          <h1 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'22px', fontWeight:800, color:'#9a4600', margin:0 }}>Ahara</h1>
          <p style={{ fontSize:'12px', color:'#564338', marginTop:'2px' }}>Nourish your day</p>
        </div>
        <nav style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <NavItem icon="dashboard" label="Dashboard" active={activeNav==='dashboard'} fill onClick={()=>handleNav('dashboard')}/>
          <NavItem icon="restaurant_menu" label="Meal Builder" active={activeNav==='meal'} onClick={()=>handleNav('meal')}/>
          <NavItem icon="timeline" label="Daily Timeline" active={activeNav==='timeline'} onClick={()=>handleNav('timeline')}/>
          <NavItem icon="person" label="Profile" active={activeNav==='profile'} onClick={()=>handleNav('profile')}/>
        </nav>
        <div style={{ padding:'0 24px' }}>
          <button onClick={()=>handleNav('meal')} style={{ width:'100%', padding:'14px', borderRadius:'14px', backgroundColor:'#ff8a3d', color:'#682d00', border:'none', cursor:'pointer', fontWeight:700, fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', boxShadow:'0 4px 16px rgba(255,138,61,0.3)' }}>
            <span className="material-symbols-outlined" style={{ fontSize:'20px' }}>add</span>
            Log Meal
          </button>
        </div>
      </aside>

      <main style={{ marginLeft:'256px', minHeight:'100vh' }}>
        <header style={{ position:'fixed', top:0, left:'256px', right:0, zIndex:40, backgroundColor:'rgba(255,248,241,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(221,193,179,0.35)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px', boxShadow:'0 1px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ position:'relative' }}>
            <span className="material-symbols-outlined" style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', fontSize:'20px', color:'#564338' }}>search</span>
            <input type="text" placeholder="Search nutrients, recipes..." style={{ paddingLeft:'40px', paddingRight:'16px', paddingTop:'9px', paddingBottom:'9px', backgroundColor:'#f9f3eb', border:'none', borderRadius:'50px', fontSize:'14px', color:'#1e1b17', outline:'none', width:'260px' }}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
            <button style={{ padding:'8px', background:'none', border:'none', cursor:'pointer', borderRadius:'50%', color:'#564338', display:'flex' }}>
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button onClick={onLogout} title="Logout" style={{ width:'36px', height:'36px', borderRadius:'50%', backgroundColor:'#ff8a3d', border:'2px solid #ffb68d', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#682d00', fontWeight:800, fontSize:'14px', fontFamily:'Plus Jakarta Sans, sans-serif' }}>
              {firstName[0].toUpperCase()}
            </button>
          </div>
        </header>

        <div style={{ paddingTop:'88px', paddingBottom:'48px', padding:'88px 24px 48px', maxWidth:'1100px', margin:'0 auto' }}>
          <section style={{ marginBottom:'32px' }}>
            <h2 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'32px', fontWeight:700, color:'#1e1b17', margin:'0 0 6px', letterSpacing:'-0.01em' }}>Welcome back, {firstName}</h2>
            <p style={{ fontSize:'16px', color:'#564338', margin:0 }}>{user?.goal ? `Goal: ${goalLabels[user.goal] || user.goal} · ` : ''}Your metabolic health is trending 12% better than last week.</p>
          </section>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gap:'20px' }}>
            {/* Daily Summary */}
            <div className="glass-card" style={{ gridColumn:'span 8', borderRadius:'24px', padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'32px' }}>
                <h3 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'22px', fontWeight:700, color:'#1e1b17', margin:0 }}>Daily Summary</h3>
                <span style={{ fontSize:'12px', color:'#564338', display:'flex', alignItems:'center', gap:'4px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:'16px' }}>calendar_today</span>Today, Oct 24
                </span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px', alignItems:'end' }}>
                {[
                  { label:'Calories', val:'1,420', unit:'kcal', color:'#ff8a3d', trackColor:'#eee7df', max:2000, num:1420, stroke:8, highlight:false },
                  { label:'Protein', val:'112', unit:'g', color:'#9a4600', trackColor:'#eee7df', max:150, num:112, stroke:12, highlight:true },
                  { label:'Carbs', val:'184', unit:'g', color:'#d9a000', trackColor:'#eee7df', max:220, num:184, stroke:8, highlight:false },
                  { label:'Fat', val:'42', unit:'g', color:'#91f78e', trackColor:'#eee7df', max:65, num:42, stroke:8, highlight:false },
                ].map(m => (
                  <div key={m.label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', ...(m.highlight ? { backgroundColor:'rgba(255,138,61,0.1)', borderRadius:'16px', padding:'12px 8px' } : {}) }}>
                    <CircleProgress value={m.num} max={m.max} color={m.color} trackColor={m.trackColor} size={120} stroke={m.stroke}>
                      <span style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize: m.highlight?'20px':'18px', fontWeight:700, color: m.highlight?'#9a4600':'#1e1b17', lineHeight:1 }}>{m.val}</span>
                      <span style={{ fontSize:'11px', color:'#564338' }}>{m.unit}</span>
                    </CircleProgress>
                    <span style={{ fontSize:'13px', fontWeight: m.highlight?700:600, color: m.highlight?'#9a4600':'#1e1b17', letterSpacing:'0.03em' }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div style={{ gridColumn:'span 4', borderRadius:'24px', padding:'24px', backgroundColor:'#ffdea3', boxShadow:'0 2px 12px rgba(0,0,0,0.05)', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>
              <span className="material-symbols-outlined" style={{ position:'absolute', top:'-8px', right:'8px', fontSize:'120px', color:'rgba(0,0,0,0.07)', fontVariationSettings:"'FILL' 1", lineHeight:1, userSelect:'none' }}>lightbulb</span>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
                  <span className="material-symbols-outlined" style={{ color:'#261900', fontSize:'22px' }}>smart_toy</span>
                  <h3 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'20px', fontWeight:700, color:'#261900', margin:0 }}>AI Insights</h3>
                </div>
                <p style={{ fontSize:'16px', color:'#5d4200', lineHeight:1.7, margin:0 }}>You're doing great with protein today! Consider adding <strong style={{ textDecoration:'underline', textDecorationColor:'#d9a000' }}>8g more fiber</strong> to your next meal.</p>
              </div>
              <button onClick={()=>handleNav('meal')} style={{ position:'relative', zIndex:1, marginTop:'32px', padding:'12px 16px', borderRadius:'12px', backgroundColor:'rgba(255,255,255,0.25)', border:'none', cursor:'pointer', fontSize:'13px', fontWeight:600, color:'#261900', display:'flex', alignItems:'center', justifyContent:'space-between' }}
                onMouseOver={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.38)'}
                onMouseOut={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.25)'}
              >
                See Fiber-Rich Recipes
                <span className="material-symbols-outlined" style={{ fontSize:'18px' }}>arrow_forward</span>
              </button>
            </div>

            {/* Recent Meals */}
            <div style={{ gridColumn:'span 12' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
                <h3 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'22px', fontWeight:700, color:'#1e1b17', margin:0 }}>Recent Meals</h3>
                <a href="#" style={{ fontSize:'13px', fontWeight:600, color:'#9a4600', textDecoration:'none' }}>View History</a>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
                <MealCard image="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=90&fit=crop" title="Avocado Toast" score={82} scoreColor="#006e1c" tags={[{label:'High Protein',bg:'rgba(145,247,142,0.3)',color:'#00731e'},{label:'420 kcal',bg:'#eee7df',color:'#564338'}]} time="08:30 AM"/>
                <MealCard image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=90&fit=crop" title="Quinoa Power Bowl" score={94} scoreColor="#9a4600" tags={[{label:'Low Glycemic',bg:'#ffdea3',color:'#523a00'},{label:'580 kcal',bg:'#eee7df',color:'#564338'}]} time="01:15 PM"/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const MealCard = ({ image, title, score, scoreColor, tags, time }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="glass-card" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ borderRadius:'24px', overflow:'hidden', display:'flex', boxShadow: hovered?'0 8px 32px rgba(0,0,0,0.10)':'0 2px 8px rgba(0,0,0,0.05)', transition:'box-shadow 0.2s' }}>
      <div style={{ width:'36%', minHeight:'160px', overflow:'hidden', flexShrink:0 }}>
        <img src={image} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s', transform: hovered?'scale(1.05)':'scale(1)' }}/>
      </div>
      <div style={{ flex:1, padding:'20px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
            <h4 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'18px', fontWeight:700, color:'#1e1b17', margin:0 }}>{title}</h4>
            <div style={{ textAlign:'right' }}>
              <span style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'20px', fontWeight:700, color:scoreColor }}>{score}<span style={{ fontSize:'13px', fontWeight:400, color:'#564338' }}>/100</span></span>
              <p style={{ fontSize:'11px', color:'#564338', margin:0 }}>Score</p>
            </div>
          </div>
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            {tags.map(tag=>(
              <span key={tag.label} style={{ padding:'4px 12px', borderRadius:'50px', fontSize:'11px', fontWeight:600, backgroundColor:tag.bg, color:tag.color }}>{tag.label}</span>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'16px' }}>
          <span style={{ fontSize:'12px', color:'#564338' }}>{time}</span>
          <button style={{ width:'32px', height:'32px', borderRadius:'50%', border:'none', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'transform 0.2s', transform: hovered?'translateX(3px)':'translateX(0)' }}>
            <span className="material-symbols-outlined" style={{ color:'#9a4600', fontSize:'20px' }}>chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage