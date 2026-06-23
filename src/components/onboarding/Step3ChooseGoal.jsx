import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { BackBtn, ContinueBtn, LoginLink, CARD_H } from './Step1Essentials'

const goals = [
  { id:'gain-muscle', emoji:'🏋️', bg:'#FFF0E6', title:'Gain Muscle', desc:'High-protein meals designed for strength and recovery.' },
  { id:'lose-weight', emoji:'⚖️', bg:'#E8F5E9', title:'Lose Weight', desc:'Calorie-conscious, nutrient-dense recipes for shedding fat.' },
  { id:'maintain-weight', emoji:'🎯', bg:'#FFF8E1', title:'Maintain Weight', desc:'Balanced macros to stay at your peak performance level.' },
  { id:'improve-health', emoji:'❤️', bg:'#FCE4EC', title:'Improve Health', desc:'Gut-friendly, organic ingredients for overall longevity.' },
]

const Step3ChooseGoal = ({ onNext, onBack, onLoginClick }) => {
  const { updateUser } = useUser()
  const [selected, setSelected] = useState(null)

  const handleNext = () => { if(selected){ updateUser({goal:selected}); onNext({goal:selected}) } }

  return (
    <div style={{ display:'flex', width:'100%', height:`${CARD_H}px`, borderRadius:'24px', overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.15)' }}>

      {/* Left */}
      <div style={{ width:'42%', position:'relative', flexShrink:0, overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=90&fit=crop" alt="Bowl" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #E8750A 0%, rgba(200,101,27,0.35) 45%, transparent 70%)' }} />
        <div style={{ position:'absolute', bottom:'36px', left:'24px', right:'24px', zIndex:2 }}>
          <div style={{ backgroundColor:'rgba(255,255,255,0.16)', backdropFilter:'blur(12px)', borderRadius:'18px', padding:'20px' }}>
            <h3 style={{ color:'white', fontWeight:800, fontSize:'1.15rem', margin:'0 0 8px' }}>Nourish Your Ambition</h3>
            <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'12px', lineHeight:1.65, margin:'0 0 16px' }}>Personalized nutrition starts with a clear vision. Tell us where you want to go.</p>
            <div style={{ display:'flex', gap:'24px' }}>
              <div><p style={{ color:'white', fontWeight:800, fontSize:'16px', margin:0 }}>10k+</p><p style={{ color:'rgba(255,255,255,0.7)', fontSize:'10px', margin:0 }}>RECIPES</p></div>
              <div><p style={{ color:'white', fontWeight:800, fontSize:'16px', margin:0 }}>98%</p><p style={{ color:'rgba(255,255,255,0.7)', fontSize:'10px', margin:0 }}>SUCCESS</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ flex:1, backgroundColor:'white', display:'flex', flexDirection:'column', padding:'32px 40px', overflowY:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 2v20M7 2v6a4 4 0 0 0 4 4M17 2c0 0 2 2 2 6s-2 6-2 6v8" stroke="#C8651B" strokeWidth="2.2" strokeLinecap="round"/></svg>
            <span style={{ fontWeight:700, fontSize:'14px', color:'#2C1A0E' }}>Ahara</span>
          </div>
          <div style={{ flex:1, margin:'0 16px', height:'5px', borderRadius:'10px', backgroundColor:'#F0EAE0', overflow:'hidden' }}>
            <div style={{ width:'75%', height:'100%', backgroundColor:'#E8750A', borderRadius:'10px' }} />
          </div>
          <span style={{ fontSize:'12px', color:'#7A6A5A' }}>Help</span>
        </div>

        <BackBtn onClick={onBack} />

        <h2 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'1.6rem', fontWeight:800, color:'#2C1A0E', margin:'0 0 6px' }}>Choose Your Goal</h2>
        <p style={{ fontSize:'13px', color:'#7A6A5A', lineHeight:1.6, margin:'0 0 20px' }}>
          Select the primary focus for your plan. You can <span style={{ color:'#C8651B' }}>change this later.</span>
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'22px' }}>
          {goals.map(g=>(
            <button key={g.id} onClick={()=>setSelected(g.id)} style={{ textAlign:'left', padding:'16px', borderRadius:'16px', border:`2px solid ${selected===g.id?'#E8750A':'#F0EAE0'}`, backgroundColor:selected===g.id?'#FFF6EE':'white', cursor:'pointer', transition:'all 0.18s' }}>
              <div style={{ width:'36px', height:'36px', borderRadius:'10px', backgroundColor:g.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', marginBottom:'10px' }}>{g.emoji}</div>
              <p style={{ fontSize:'13px', fontWeight:700, color:'#2C1A0E', margin:'0 0 4px' }}>{g.title}</p>
              <p style={{ fontSize:'11px', color:'#7A6A5A', lineHeight:1.5, margin:0 }}>{g.desc}</p>
            </button>
          ))}
        </div>

        <ContinueBtn onClick={handleNext} disabled={!selected} />
        <LoginLink onClick={onLoginClick} />

        <div style={{ display:'flex', justifyContent:'center', gap:'24px', marginTop:'16px' }}>
          {['Trusted by Athletes','Scientifically Proven','Chef Crafted'].map(l=>(
            <span key={l} style={{ fontSize:'11px', color:'#B0A090' }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Step3ChooseGoal