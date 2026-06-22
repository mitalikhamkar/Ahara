import React, { useState } from 'react'

const Step1Essentials = ({ onNext, onBack, onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div style={{ display:'flex', width:'100%', minHeight:'580px', borderRadius:'24px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.14)', backgroundColor:'white' }}>

      {/* Left Panel */}
      <div style={{ width:'42%', position:'relative', overflow:'hidden', minHeight:'580px' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=90&fit=crop"
          alt="Fresh vegetables"
          style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }}
        />
        {/* Warm overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, rgba(200,101,27,0.55) 0%, rgba(180,130,80,0.3) 50%, rgba(0,0,0,0.4) 100%)' }} />

        {/* Logo */}
        <div style={{ position:'relative', zIndex:2, padding:'24px 28px', display:'flex', alignItems:'center', gap:'8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M11 2v20M7 2v6a4 4 0 0 0 4 4M17 2c0 0 2 2 2 6s-2 6-2 6v8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color:'white', fontWeight:700, fontSize:'16px' }}>Ahara</span>
        </div>

        {/* Hero text in middle */}
        <div style={{ position:'absolute', bottom:'140px', left:'28px', right:'28px', zIndex:2 }}>
          <h2 style={{ color:'white', fontWeight:900, fontSize:'2rem', lineHeight:1.15, margin:'0 0 10px 0', textShadow:'0 2px 12px rgba(0,0,0,0.3)' }}>
            Start Your<br />Vitality Journey.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.88)', fontSize:'13px', lineHeight:1.6, margin:0 }}>
            Precision nutrition tailored to your unique biology and lifestyle goals.
          </p>
        </div>

        {/* Badge */}
        <div style={{ position:'absolute', bottom:'24px', left:'20px', right:'20px', zIndex:2, backgroundColor:'white', borderRadius:'16px', padding:'14px 16px', display:'flex', alignItems:'center', gap:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}>
          <div style={{ width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'#E8F5E9', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
              <polyline points="22 4 12 14.01 9 11.01" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize:'13px', fontWeight:700, color:'#2C1A0E', margin:'0 0 2px 0' }}>98% Success Rate</p>
            <p style={{ fontSize:'11px', color:'#7A6A5A', margin:0 }}>Personalized meal planning based on metrics</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'48px 44px' }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{ alignSelf:'flex-start', display:'flex', alignItems:'center', gap:'6px', background:'none', border:'none', cursor:'pointer', color:'#7A6A5A', fontSize:'13px', marginBottom:'24px', padding:0 }}
          onMouseOver={e => e.currentTarget.style.color='#C8651B'}
          onMouseOut={e => e.currentTarget.style.color='#7A6A5A'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <p style={{ fontSize:'11px', fontWeight:700, color:'#C8651B', textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 4px 0' }}>Step 1 of 4</p>
        <h2 style={{ fontSize:'1.6rem', fontWeight:800, color:'#2C1A0E', margin:'0 0 6px 0' }}>Account Essentials</h2>
        <div style={{ height:'1px', backgroundColor:'#EDE8E0', margin:'0 0 28px 0' }} />

        <div style={{ display:'flex', flexDirection:'column', gap:'18px', marginBottom:'28px' }}>
          <div>
            <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#3D2B1A', marginBottom:'6px' }}>Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Alex Rivera"
              style={{ width:'100%', padding:'13px 16px', borderRadius:'12px', border:'1.5px solid transparent', backgroundColor:'#F5EFE6', fontSize:'14px', color:'#3D2B1A', outline:'none', boxSizing:'border-box' }}
              onFocus={e => e.target.style.borderColor='#C8651B'} onBlur={e => e.target.style.borderColor='transparent'}
            />
          </div>
          <div>
            <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#3D2B1A', marginBottom:'6px' }}>Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="alex@vitality.com"
              style={{ width:'100%', padding:'13px 16px', borderRadius:'12px', border:'1.5px solid transparent', backgroundColor:'#F5EFE6', fontSize:'14px', color:'#3D2B1A', outline:'none', boxSizing:'border-box' }}
              onFocus={e => e.target.style.borderColor='#C8651B'} onBlur={e => e.target.style.borderColor='transparent'}
            />
          </div>
          <div>
            <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#3D2B1A', marginBottom:'6px' }}>Password</label>
            <div style={{ position:'relative' }}>
              <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="••••••••"
                style={{ width:'100%', padding:'13px 48px 13px 16px', borderRadius:'12px', border:'1.5px solid transparent', backgroundColor:'#F5EFE6', fontSize:'14px', color:'#3D2B1A', outline:'none', boxSizing:'border-box' }}
                onFocus={e => e.target.style.borderColor='#C8651B'} onBlur={e => e.target.style.borderColor='transparent'}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#7A6A5A', padding:0, display:'flex' }}>
                {showPassword
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
                }
              </button>
            </div>
          </div>
        </div>

        <button onClick={onNext}
          style={{ width:'100%', padding:'15px', borderRadius:'12px', backgroundColor:'#E8750A', color:'white', fontWeight:700, fontSize:'15px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'16px' }}
          onMouseOver={e => e.currentTarget.style.opacity='0.9'} onMouseOut={e => e.currentTarget.style.opacity='1'}
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p style={{ textAlign:'center', fontSize:'13px', color:'#7A6A5A' }}>
          Already have an account?{' '}
          <span onClick={onLoginClick} style={{ color:'#C8651B', fontWeight:700, cursor:'pointer' }}>Login</span>
        </p>
      </div>
    </div>
  )
}

export default Step1Essentials