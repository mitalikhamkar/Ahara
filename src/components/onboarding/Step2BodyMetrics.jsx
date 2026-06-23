import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { BackBtn, ContinueBtn, LoginLink, CARD_H } from './Step1Essentials'

const Step2BodyMetrics = ({ onNext, onBack, onLoginClick }) => {
  const { updateUser } = useUser()
  const [gender, setGender] = useState('Male')
  const [form, setForm] = useState({ dob:'', height:'175', weight:'70' })
  const onChange = e => setForm(p => ({...p, [e.target.name]: e.target.value}))

  const handleNext = () => { const d={...form,gender}; updateUser(d); onNext(d) }

  const navItems = [
    { label:'Essentials', icon:'👤', done:true },
    { label:'Body Metrics', icon:'📊', active:true },
    { label:'Health Goals', icon:'🎯' },
    { label:'Activity Level', icon:'🏃' },
  ]

  return (
    <div style={{ display:'flex', width:'100%', height:`${CARD_H}px`, borderRadius:'24px', overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.15)', backgroundColor:'white' }}>

      {/* Left image */}
      <div style={{ width:'34%', position:'relative', flexShrink:0, overflow:'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=90&fit=crop&crop=center"
          alt="Healthy food"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)' }} />
        <div style={{ position:'absolute', top:'20px', left:'20px', zIndex:2, backgroundColor:'rgba(255,255,255,0.18)', backdropFilter:'blur(10px)', borderRadius:'12px', padding:'8px 14px' }}>
          <span style={{ color:'white', fontWeight:700, fontSize:'15px' }}>Ahara</span>
        </div>
        <div style={{ position:'absolute', bottom:'32px', left:'24px', right:'24px', zIndex:2 }}>
          <h3 style={{ color:'white', fontWeight:800, fontSize:'1.25rem', lineHeight:1.3, margin:'0 0 6px' }}>Nourish your body with precision.</h3>
          <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'12px', lineHeight:1.6, margin:0 }}>Every metric helps us craft your perfect culinary journey.</p>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ width:'150px', borderRight:'1px solid #F0EAE0', display:'flex', flexDirection:'column', padding:'28px 10px', gap:'4px', flexShrink:0 }}>
        {navItems.map(item => (
          <div key={item.label} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 10px', borderRadius:'12px', fontSize:'12px', fontWeight: item.active?700:500, backgroundColor: item.active?'#E8750A':'transparent', color: item.active?'white': item.done?'#C8651B':'#7A6A5A' }}>
            <span style={{ fontSize:'14px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'36px 36px', overflowY:'auto' }}>
        <BackBtn onClick={onBack} />

        <p style={{ fontSize:'10px', fontWeight:700, color:'#C8651B', textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 2px' }}>Step 2 of 4</p>
        <p style={{ fontSize:'11px', color:'#7A6A5A', margin:'0 0 6px' }}>Profile Setup</p>
        <h2 style={{ fontFamily:'Plus Jakarta Sans, sans-serif', fontSize:'1.5rem', fontWeight:800, color:'#2C1A0E', margin:'0 0 6px' }}>Body Metrics</h2>
        <p style={{ fontSize:'12px', color:'#7A6A5A', lineHeight:1.7, margin:'0 0 24px', maxWidth:'300px' }}>Tell us about your physical profile. Helps personalize your caloric and macronutrient goals.</p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'14px' }}>
          <div>
            <label style={lbl}>Date of Birth</label>
            <input type="date" name="dob" value={form.dob} onChange={onChange} style={inp} onFocus={e=>e.target.style.borderColor='#C8651B'} onBlur={e=>e.target.style.borderColor='#EDE8E0'} />
          </div>
          <div>
            <label style={lbl}>Biological Gender</label>
            <div style={{ display:'flex', gap:'6px' }}>
              {['Male','Female','Other'].map(g=>(
                <button key={g} onClick={()=>setGender(g)} style={{ flex:1, padding:'11px 2px', borderRadius:'10px', fontSize:'11px', fontWeight:600, cursor:'pointer', border:`1.5px solid ${gender===g?'#E8750A':'#EDE8E0'}`, backgroundColor:gender===g?'#E8750A':'white', color:gender===g?'white':'#7A6A5A', transition:'all 0.2s' }}>{g}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'24px' }}>
          {[['height','cm'],['weight','kg']].map(([name,unit])=>(
            <div key={name}>
              <label style={lbl}>{name==='height'?'Height':'Current Weight'}</label>
              <div style={{ display:'flex', border:'1.5px solid #EDE8E0', borderRadius:'10px', overflow:'hidden', backgroundColor:'#FAFAFA' }}>
                <input type="number" name={name} value={form[name]} onChange={onChange} style={{ flex:1, padding:'11px 12px', border:'none', backgroundColor:'transparent', fontSize:'13px', color:'#3D2B1A', outline:'none' }} />
                <span style={{ padding:'11px 12px', borderLeft:'1px solid #EDE8E0', fontSize:'12px', color:'#7A6A5A', backgroundColor:'#F5F0E8' }}>{unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#7A6A5A" strokeWidth="2" strokeLinecap="round"/></svg>
          <span style={{ fontSize:'11px', color:'#7A6A5A' }}>Your data is kept private and secure</span>
        </div>

        <ContinueBtn onClick={handleNext} />
        <LoginLink onClick={onLoginClick} />

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto', paddingTop:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'30px', height:'30px', borderRadius:'50%', backgroundColor:'#F0EAE0', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#7A6A5A" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div><p style={{ fontSize:'11px', fontWeight:700, color:'#3D2B1A', margin:0 }}>Guest User</p><p style={{ fontSize:'9px', color:'#7A6A5A', margin:0 }}>STANDARD TIER</p></div>
          </div>
          <div style={{ display:'flex', gap:'14px' }}>
            <span style={{ fontSize:'10px', color:'#B0A090', cursor:'pointer' }}>TERMS</span>
            <span style={{ fontSize:'10px', color:'#B0A090', cursor:'pointer' }}>PRIVACY</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const lbl = { display:'block', fontSize:'12px', fontWeight:600, color:'#3D2B1A', marginBottom:'6px' }
const inp = { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid #EDE8E0', backgroundColor:'#FAFAFA', fontSize:'13px', color:'#3D2B1A', outline:'none', boxSizing:'border-box', fontFamily:'Inter, sans-serif', transition:'border-color 0.2s' }

export default Step2BodyMetrics