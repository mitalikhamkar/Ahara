import React, { useState } from 'react'

const goals = [
  { id: 'gain-muscle', emoji: '🏋️', bg: '#FFF0E6', title: 'Gain Muscle', desc: 'High-protein meals designed for strength and recovery.' },
  { id: 'lose-weight', emoji: '⚖️', bg: '#E8F5E9', title: 'Lose Weight', desc: 'Calorie-conscious, nutrient-dense recipes for shedding fat.' },
  { id: 'maintain-weight', emoji: '🎯', bg: '#FFF8E1', title: 'Maintain Weight', desc: 'Balanced macros to stay at your peak performance level.' },
  { id: 'improve-health', emoji: '❤️', bg: '#FCE4EC', title: 'Improve Health', desc: 'Gut-friendly, organic ingredients for overall longevity.' },
]

const Step3ChooseGoal = ({ onNext, onBack, onLoginClick }) => {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ display:'flex', width:'100%', minHeight:'600px', borderRadius:'24px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.14)' }}>

      {/* Left Panel */}
      <div style={{ width:'42%', position:'relative', overflow:'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=90&fit=crop"
          alt="Healthy bowl"
          style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #E8750A 0%, rgba(200,101,27,0.4) 45%, transparent 70%)' }} />

        <div style={{ position:'absolute', bottom:'36px', left:'24px', right:'24px', zIndex:2 }}>
          <div style={{ backgroundColor:'rgba(255,255,255,0.18)', backdropFilter:'blur(12px)', borderRadius:'18px', padding:'20px' }}>
            <h3 style={{ color:'white', fontWeight:800, fontSize:'1.2rem', margin:'0 0 8px 0' }}>Nourish Your Ambition</h3>
            <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'12px', lineHeight:1.6, margin:'0 0 16px 0' }}>
              Personalized nutrition starts with a clear vision. Tell us where you want to go, and we'll map the culinary path to get you there.
            </p>
            <div style={{ display:'flex', gap:'24px' }}>
              <div><p style={{ color:'white', fontWeight:800, fontSize:'16px', margin:0 }}>10k+</p><p style={{ color:'rgba(255,255,255,0.7)', fontSize:'10px', margin:0 }}>RECIPES</p></div>
              <div><p style={{ color:'white', fontWeight:800, fontSize:'16px', margin:0 }}>98%</p><p style={{ color:'rgba(255,255,255,0.7)', fontSize:'10px', margin:0 }}>SUCCESS</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex:1, backgroundColor:'white', display:'flex', flexDirection:'column', padding:'36px 40px' }}>
        {/* Topbar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 2v20M7 2v6a4 4 0 0 0 4 4M17 2c0 0 2 2 2 6s-2 6-2 6v8" stroke="#C8651B" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontWeight:700, fontSize:'14px', color:'#2C1A0E' }}>Ahara</span>
          </div>
          <div style={{ flex:1, margin:'0 20px', height:'5px', borderRadius:'10px', backgroundColor:'#F0EAE0', overflow:'hidden' }}>
            <div style={{ width:'75%', height:'100%', backgroundColor:'#E8750A', borderRadius:'10px' }} />
          </div>
          <span style={{ fontSize:'12px', color:'#7A6A5A', cursor:'pointer' }}>Help</span>
        </div>

        {/* Back */}
        <button onClick={onBack}
          style={{ alignSelf:'flex-start', display:'flex', alignItems:'center', gap:'6px', background:'none', border:'none', cursor:'pointer', color:'#7A6A5A', fontSize:'13px', marginBottom:'16px', padding:0 }}
          onMouseOver={e => e.currentTarget.style.color='#C8651B'} onMouseOut={e => e.currentTarget.style.color='#7A6A5A'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <h2 style={{ fontSize:'1.6rem', fontWeight:800, color:'#2C1A0E', margin:'0 0 6px 0' }}>Choose Your Goal</h2>
        <p style={{ fontSize:'13px', color:'#7A6A5A', lineHeight:1.6, margin:'0 0 24px 0' }}>
          Select the primary focus for your personalized nutrition plan. You can{' '}
          <span style={{ color:'#C8651B' }}>change this later.</span>
        </p>

        {/* Goal Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'24px' }}>
          {goals.map(goal => (
            <button key={goal.id} onClick={() => setSelected(goal.id)}
              style={{ textAlign:'left', padding:'16px', borderRadius:'16px', border:`2px solid ${selected===goal.id ? '#E8750A' : '#F0EAE0'}`, backgroundColor: selected===goal.id ? '#FFF6EE' : 'white', cursor:'pointer', transition:'all 0.2s' }}
            >
              <div style={{ width:'36px', height:'36px', borderRadius:'10px', backgroundColor:goal.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', marginBottom:'10px' }}>{goal.emoji}</div>
              <p style={{ fontSize:'13px', fontWeight:700, color:'#2C1A0E', margin:'0 0 4px 0' }}>{goal.title}</p>
              <p style={{ fontSize:'11px', color:'#7A6A5A', lineHeight:1.5, margin:0 }}>{goal.desc}</p>
            </button>
          ))}
        </div>

        <button onClick={onNext} disabled={!selected}
          style={{ width:'100%', padding:'14px', borderRadius:'12px', backgroundColor: selected ? '#E8750A' : '#E8D8C4', color: selected ? 'white' : '#B0A090', fontWeight:700, fontSize:'14px', border:'none', cursor: selected ? 'pointer' : 'not-allowed', marginBottom:'14px', transition:'all 0.2s' }}
        >
          Continue
        </button>

        <p style={{ textAlign:'center', fontSize:'13px', color:'#7A6A5A', marginBottom:'20px' }}>
          Already have an account?{' '}
          <span onClick={onLoginClick} style={{ color:'#C8651B', fontWeight:700, cursor:'pointer' }}>Login</span>
        </p>

        <div style={{ display:'flex', justifyContent:'center', gap:'28px' }}>
          {['Trusted by Athletes', 'Scientifically Proven', 'Chef Crafted'].map(l => (
            <span key={l} style={{ fontSize:'11px', color:'#B0A090' }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Step3ChooseGoal