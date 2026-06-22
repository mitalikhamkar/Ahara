import React, { useState } from 'react'

const Step2BodyMetrics = ({ onNext, onBack, onLoginClick }) => {
  const [gender, setGender] = useState('Male')
  const [form, setForm] = useState({ dob: '', height: '175', weight: '70' })
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const sidebarItems = [
    { label: 'Essentials', icon: '👤', active: false },
    { label: 'Body Metrics', icon: '📊', active: true },
    { label: 'Health Goals', icon: '🎯', active: false },
    { label: 'Activity Level', icon: '🏃', active: false },
  ]

  return (
    <div style={{ display:'flex', width:'100%', minHeight:'600px', borderRadius:'24px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.14)', backgroundColor:'white' }}>

      {/* Left Panel */}
      <div style={{ width:'36%', position:'relative', minHeight:'600px', overflow:'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=90&fit=crop"
          alt="Healthy toast"
          style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

        {/* Logo pill */}
        <div style={{ position:'absolute', top:'20px', left:'20px', zIndex:2, backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(10px)', borderRadius:'12px', padding:'8px 14px' }}>
          <span style={{ color:'white', fontWeight:700, fontSize:'15px' }}>Ahara</span>
        </div>

        <div style={{ position:'absolute', bottom:'32px', left:'24px', right:'24px', zIndex:2 }}>
          <h3 style={{ color:'white', fontWeight:800, fontSize:'1.3rem', lineHeight:1.3, margin:'0 0 6px 0' }}>Nourish your body with precision.</h3>
          <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'12px', lineHeight:1.6, margin:0 }}>Every metric helps us craft your perfect culinary journey.</p>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ width:'160px', borderRight:'1px solid #F0EAE0', display:'flex', flexDirection:'column', padding:'28px 12px', gap:'4px' }}>
        {sidebarItems.map(item => (
          <div key={item.label} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 12px', borderRadius:'12px', cursor:'pointer', backgroundColor: item.active ? '#E8750A' : 'transparent', color: item.active ? 'white' : '#7A6A5A', fontSize:'12px', fontWeight: item.active ? 700 : 500, transition:'all 0.2s' }}>
            <span style={{ fontSize:'14px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'36px 36px' }}>
        <button onClick={onBack}
          style={{ alignSelf:'flex-start', display:'flex', alignItems:'center', gap:'6px', background:'none', border:'none', cursor:'pointer', color:'#7A6A5A', fontSize:'13px', marginBottom:'20px', padding:0 }}
          onMouseOver={e => e.currentTarget.style.color='#C8651B'} onMouseOut={e => e.currentTarget.style.color='#7A6A5A'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <p style={{ fontSize:'10px', fontWeight:700, color:'#C8651B', textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 2px 0' }}>Step 2 of 4</p>
        <p style={{ fontSize:'11px', color:'#7A6A5A', margin:'0 0 6px 0' }}>Profile Setup</p>
        <h2 style={{ fontSize:'1.5rem', fontWeight:800, color:'#2C1A0E', margin:'0 0 6px 0' }}>Body Metrics</h2>
        <p style={{ fontSize:'12px', color:'#7A6A5A', lineHeight:1.6, margin:'0 0 24px 0', maxWidth:'320px' }}>
          Tell us about your physical profile. This helps personalize your caloric intake and macronutrient goals.
        </p>

        {/* DOB + Gender */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#3D2B1A', marginBottom:'6px' }}>Date of Birth</label>
            <div style={{ position:'relative' }}>
              <input type="date" name="dob" value={form.dob} onChange={handleChange}
                style={{ width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid #EDE8E0', backgroundColor:'#FAFAFA', fontSize:'13px', color:'#3D2B1A', outline:'none', boxSizing:'border-box' }}
                onFocus={e => e.target.style.borderColor='#C8651B'} onBlur={e => e.target.style.borderColor='#EDE8E0'}
              />
            </div>
          </div>
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#3D2B1A', marginBottom:'6px' }}>Biological Gender</label>
            <div style={{ display:'flex', gap:'6px' }}>
              {['Male', 'Female', 'Other'].map(g => (
                <button key={g} onClick={() => setGender(g)}
                  style={{ flex:1, padding:'11px 4px', borderRadius:'10px', fontSize:'11px', fontWeight:600, cursor:'pointer', border:'1.5px solid', borderColor: gender===g ? '#E8750A' : '#EDE8E0', backgroundColor: gender===g ? '#E8750A' : 'white', color: gender===g ? 'white' : '#7A6A5A', transition:'all 0.2s' }}
                >{g}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Height + Weight */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'28px' }}>
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#3D2B1A', marginBottom:'6px' }}>Height</label>
            <div style={{ display:'flex', border:'1.5px solid #EDE8E0', borderRadius:'10px', overflow:'hidden', backgroundColor:'#FAFAFA' }}>
              <input type="number" name="height" value={form.height} onChange={handleChange}
                style={{ flex:1, padding:'11px 14px', border:'none', backgroundColor:'transparent', fontSize:'13px', color:'#3D2B1A', outline:'none' }}
              />
              <span style={{ padding:'11px 12px', borderLeft:'1px solid #EDE8E0', fontSize:'12px', color:'#7A6A5A', backgroundColor:'#F5F0E8' }}>cm</span>
            </div>
          </div>
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#3D2B1A', marginBottom:'6px' }}>Current Weight</label>
            <div style={{ display:'flex', border:'1.5px solid #EDE8E0', borderRadius:'10px', overflow:'hidden', backgroundColor:'#FAFAFA' }}>
              <input type="number" name="weight" value={form.weight} onChange={handleChange}
                style={{ flex:1, padding:'11px 14px', border:'none', backgroundColor:'transparent', fontSize:'13px', color:'#3D2B1A', outline:'none' }}
              />
              <span style={{ padding:'11px 12px', borderLeft:'1px solid #EDE8E0', fontSize:'12px', color:'#7A6A5A', backgroundColor:'#F5F0E8' }}>kg</span>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#7A6A5A" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize:'11px', color:'#7A6A5A' }}>Your data is kept private and secure</span>
        </div>

        <button onClick={onNext}
          style={{ width:'100%', padding:'14px', borderRadius:'12px', backgroundColor:'#C8651B', color:'white', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'14px' }}
          onMouseOver={e => e.currentTarget.style.opacity='0.9'} onMouseOut={e => e.currentTarget.style.opacity='1'}
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p style={{ fontSize:'12px', color:'#7A6A5A', marginBottom:'0' }}>
          Already have an account?{' '}
          <span onClick={onLoginClick} style={{ color:'#C8651B', fontWeight:700, cursor:'pointer' }}>Login</span>
        </p>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto', paddingTop:'20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'#F0EAE0', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#7A6A5A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize:'11px', fontWeight:700, color:'#3D2B1A', margin:0 }}>Guest User</p>
              <p style={{ fontSize:'9px', color:'#7A6A5A', margin:0 }}>STANDARD TIER</p>
            </div>
          </div>
          <div style={{ display:'flex', gap:'16px' }}>
            <span style={{ fontSize:'10px', color:'#B0A090', cursor:'pointer' }}>TERMS</span>
            <span style={{ fontSize:'10px', color:'#B0A090', cursor:'pointer' }}>PRIVACY</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2BodyMetrics