import React from 'react'
import Navbar from '../components/Navbar'
import HeroVisual from '../components/HeroVisual'
import Footer from '../components/Footer'

const WelcomePage = ({ onCreateAccount, onLogin }) => {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', backgroundColor:'#F5F0E8', overflow:'hidden' }}>
      <Navbar onLogin={onLogin} />

      <main style={{ flex:1, display:'flex', alignItems:'center', padding:'0 60px' }}>
        <div style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px' }}>

          {/* Left */}
          <div style={{ flex:'0 0 auto', maxWidth:'480px' }}>
            <h1 style={{ fontSize:'3.2rem', fontWeight:900, lineHeight:1.05, color:'#2C1A0E', margin:'0 0 4px 0', letterSpacing:'-0.02em' }}>
              Build Better Meals.
            </h1>
            <h1 style={{ fontSize:'3.2rem', fontWeight:900, lineHeight:1.05, color:'#C8651B', margin:'0 0 20px 0', letterSpacing:'-0.02em' }}>
              Understand Your Nutrition.
            </h1>
            <p style={{ fontSize:'15px', color:'#7A6A5A', lineHeight:1.7, marginBottom:'32px', maxWidth:'340px' }}>
              Track protein, calories, carbs, and nutrition visually.{' '}
              <span style={{ color:'#C8651B' }}>The premium experience for modern wellness.</span>
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'32px' }}>
              <button
                onClick={onCreateAccount}
                style={{ display:'flex', alignItems:'center', gap:'8px', padding:'14px 28px', borderRadius:'50px', backgroundColor:'#C8651B', color:'white', fontWeight:700, fontSize:'15px', border:'none', cursor:'pointer', transition:'opacity 0.2s' }}
                onMouseOver={e => e.currentTarget.style.opacity='0.9'}
                onMouseOut={e => e.currentTarget.style.opacity='1'}
              >
                Create Account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={onLogin}
                style={{ padding:'13px 28px', borderRadius:'50px', backgroundColor:'transparent', color:'#3D2B1A', fontWeight:600, fontSize:'15px', border:'1.5px solid #C8C0B4', cursor:'pointer' }}
                onMouseOver={e => { e.currentTarget.style.borderColor='#C8651B'; e.currentTarget.style.color='#C8651B' }}
                onMouseOut={e => { e.currentTarget.style.borderColor='#C8C0B4'; e.currentTarget.style.color='#3D2B1A' }}
              >
                Login
              </button>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ display:'flex' }}>
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&q=90&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=90&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&q=90&fit=crop&crop=face',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" style={{ width:'34px', height:'34px', borderRadius:'50%', border:'2.5px solid #F5F0E8', objectFit:'cover', marginLeft: i > 0 ? '-10px' : 0, zIndex: 3 - i, position:'relative' }} />
                ))}
              </div>
              <p style={{ fontSize:'13px', color:'#7A6A5A' }}>
                Joined by <strong style={{ color:'#3D2B1A' }}>10k+</strong> health enthusiasts
              </p>
            </div>
          </div>

          {/* Right - Hero Visual */}
          <div style={{ flex:'0 0 auto' }}>
            <HeroVisual />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default WelcomePage