import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { BackBtn, LoginLink, CARD_H } from './Step1Essentials'

const levels = [
  { id:'sedentary', emoji:'🪑', label:'Sedentary', desc:'Little to no exercise. Typical office job or stationary lifestyle.' },
  { id:'lightly-active', emoji:'🚶', label:'Lightly Active', desc:'1-3 days/week of light exercise or sports (e.g., walking, yoga).' },
  { id:'moderately-active', emoji:'🏃', label:'Moderately Active', desc:'3-5 days/week of moderate exercise or vigorous sports.' },
  { id:'very-active', emoji:'⚡', label:'Very Active', desc:'6-7 days/week of hard exercise or physical job.' },
]

const Step4ActivityLevel = ({ onNext, onBack, onLoginClick }) => {
  const { updateUser } = useUser()
  const [selected, setSelected] = useState('sedentary')

  const handleNext = () => { updateUser({activityLevel:selected}); onNext({activityLevel:selected}) }

  return (
    <div style={{ display:'flex', width:'100%', height:`${CARD_H}px`, borderRadius:'24px', overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.15)' }}>

      {/* Left */}
      <div style={{ width:'42%', position:'relative', flexShrink:0, overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=700&q=90&fit=crop" alt="Smoothie" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 40%)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', padding:'32px', zIndex:2 }}>
          <div style={{ backgroundColor:'rgba(255,255,255,0.9)', backdropFilter:'blur(14px)', borderRadius:'20px', padding:'28px 24px', textAlign:'center', boxShadow:'0 8px 32px rgba(0,0,0,0.16)', width:'100%', maxWidth:'220px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'12px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 2v20M7 2v6a4 4 0 0 0 4 4M17 2c0 0 2 2 2 6s-2 6-2 6v8" stroke="#C8651B" strokeWidth="2.2" strokeLinecap="round"/></svg>
              <span style={{ color:'#C8651B', fontWeight:800, fontSize:'16px' }}>Ahara</span>
            </div>
            <p style={{ fontSize:'13px', color:'#3D2B1A', fontWeight:500, lineHeight:1.65, margin:0 }}>Fueling your journey with nature's finest nutrients.</p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ flex:1, backgroundColor:'white', display:'flex', flexDirection:'column', padding:'32px 40px', overflowY:'auto' }}>
        {/* Progress */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
          <div style={{ flex:1, height:'5px', borderRadius:'10px', backgroundColor:'#F0EAE0', overflow:'hidden' }}>
            <div style={{ width:'100%', height:'100%', backgroundColor:'#E8750A', borderRadius:'10px' }} />
          </div>
          <span style={{ fontSize:'12px', fontWeight:700, color:'#E8750A' }}>100%</span>
        </div>

        <BackBtn onClick={onBack} />

        <p style={{ fontSize:'11px', color:'#7A6A5A', margin:'0 0 4px' }}>Step 4 of 4</p>
        <h2 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'1.6rem', fontWeight:800, color:'#2C1A0E', margin:'0 0 6px' }}>Activity Level</h2>
        <p style={{ fontSize:'13px', color:'#7A6A5A', lineHeight:1.65, margin:'0 0 20px', maxWidth:'340px' }}>
          How active are you on a typical week? <span style={{ color:'#C8651B' }}>This helps us</span> calculate your daily energy expenditure accurately.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'22px' }}>
          {levels.map(lv=>(
            <button key={lv.id} onClick={()=>setSelected(lv.id)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 16px', borderRadius:'14px', border:`2px solid ${selected===lv.id?'#E8750A':'#F0EAE0'}`, backgroundColor:selected===lv.id?'#FFF6EE':'white', cursor:'pointer', textAlign:'left', transition:'all 0.18s' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                <span style={{ fontSize:'20px', lineHeight:1, marginTop:'2px' }}>{lv.emoji}</span>
                <div>
                  <p style={{ fontSize:'13px', fontWeight:700, color:'#2C1A0E', margin:'0 0 3px' }}>{lv.label}</p>
                  <p style={{ fontSize:'11px', color:'#7A6A5A', lineHeight:1.5, margin:0, maxWidth:'240px' }}>{lv.desc}</p>
                </div>
              </div>
              <div style={{ width:'20px', height:'20px', borderRadius:'50%', border:`2px solid ${selected===lv.id?'#E8750A':'#D4C8B8'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:'10px' }}>
                {selected===lv.id && <div style={{ width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'#E8750A' }}/>}
              </div>
            </button>
          ))}
        </div>

        <button onClick={handleNext} style={{ width:'100%', padding:'15px', borderRadius:'12px', backgroundColor:'#E8750A', color:'white', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'14px', transition:'opacity 0.2s' }}
          onMouseOver={e=>e.currentTarget.style.opacity='0.9'} onMouseOut={e=>e.currentTarget.style.opacity='1'}
        >
          Create My Nutrition Profile
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <LoginLink onClick={onLoginClick} />
      </div>
    </div>
  )
}

export default Step4ActivityLevel