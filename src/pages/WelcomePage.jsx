import React from 'react'

const WelcomePage = ({ onCreateAccount, onLogin }) => {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      backgroundColor: '#F5F0E8', overflow: 'hidden', position: 'relative',
    }}>
      {/* Subtle background blobs */}
      <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,101,27,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,101,27,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <nav style={{ padding: '20px 64px', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M11 2v20M7 2v6a4 4 0 0 0 4 4M17 2c0 0 2 2 2 6s-2 6-2 6v8" stroke="#C8651B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', color: '#2C1A0E', fontWeight: 800, fontSize: '17px', letterSpacing: '-0.01em' }}>Ahara</span>
        </div>
      </nav>

      {/* Hero */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 64px', position: 'relative', zIndex: 2 }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>

          {/* Left text */}
          <div style={{ flex: '0 0 auto', maxWidth: '500px' }}>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '3.4rem', fontWeight: 900, lineHeight: 1.05, color: '#2C1A0E', margin: '0 0 2px', letterSpacing: '-0.03em' }}>
              Build Better Meals.
            </h1>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '3.4rem', fontWeight: 900, lineHeight: 1.05, color: '#C8651B', margin: '0 0 22px', letterSpacing: '-0.03em' }}>
              Understand Your Nutrition.
            </h1>
            <p style={{ fontSize: '16px', color: '#7A6A5A', lineHeight: 1.75, marginBottom: '36px', maxWidth: '380px' }}>
              Track protein, calories, carbs, and nutrition visually.{' '}
              <span style={{ color: '#C8651B' }}>The premium experience for modern wellness.</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={onCreateAccount}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 32px', borderRadius: '50px', backgroundColor: '#C8651B', color: 'white', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(200,101,27,0.3)', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(200,101,27,0.38)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(200,101,27,0.3)' }}
              >
                Create Account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={onLogin}
                style={{ padding: '14px 32px', borderRadius: '50px', backgroundColor: 'transparent', color: '#3D2B1A', fontWeight: 600, fontSize: '15px', border: '2px solid #D4C8B8', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#C8651B'; e.currentTarget.style.color = '#C8651B' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = '#D4C8B8'; e.currentTarget.style.color = '#3D2B1A' }}
              >
                Login
              </button>
            </div>
          </div>

          {/* Right – hero visual */}
          <div style={{ flex: '0 0 auto', position: 'relative', width: '480px', height: '420px' }}>
            {/* Plate */}
            <div style={{
              position: 'absolute', width: '280px', height: '280px', borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 36%, #ffffff 0%, #ece5da 55%, #d8d0c4 100%)',
              boxShadow: '0 16px 56px rgba(0,0,0,0.13)',
              top: '70px', left: '100px',
            }} />

            {/* Food images on plate */}
            <FoodImg src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=90&fit=crop" alt="Salmon" style={{ top: '38px', right: '44px', width: '104px', height: '84px' }} />
            <FoodImg src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=90&fit=crop" alt="Avocado" style={{ top: '122px', left: '64px', width: '94px', height: '82px' }} />
            <FoodImg src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&q=90&fit=crop" alt="Roasted" style={{ bottom: '84px', right: '82px', width: '100px', height: '80px' }} />
            <FoodImg src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=90&fit=crop" alt="Greens" style={{ top: '52px', left: '186px', width: '76px', height: '76px' }} />

            {/* Badges */}
            <Badge style={{ top: '18px', left: '2px' }}>
              <div style={{ width: '3px', height: '38px', backgroundColor: '#C8651B', borderRadius: '4px' }} />
              <div>
                <p style={{ fontSize: '9px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 3px' }}>PROTEIN</p>
                <p style={{ fontSize: '19px', fontWeight: 800, color: '#2C1A0E', lineHeight: 1, margin: 0 }}>34g <span style={{ fontSize: '12px', color: '#C8651B', fontWeight: 600 }}>High</span></p>
              </div>
            </Badge>

            <Badge style={{ top: '148px', right: '2px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C8651B' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3D2B1A' }}>Fats 12g</span>
            </Badge>

            <Badge style={{ bottom: '108px', left: '2px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C8651B' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3D2B1A' }}>Carbs 45g</span>
            </Badge>

            <Badge style={{ bottom: '14px', right: '2px', minWidth: '176px', gap: '14px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2.5px solid #4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: '#4CAF50' }}>92</span>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#2C1A0E', margin: '0 0 2px' }}>Meal Score</p>
                <p style={{ fontSize: '12px', color: '#4CAF50', fontWeight: 500, margin: 0 }}>Excellent Balance</p>
              </div>
            </Badge>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '18px 64px', position: 'relative', zIndex: 2 }}>
        <p style={{ fontSize: '12px', color: '#7A6A5A', margin: 0 }}>
          © 2024 Ahara Visuals.{' '}
          <span style={{ color: '#C8651B', fontWeight: 600 }}>All rights reserved.</span>
        </p>
      </footer>
    </div>
  )
}

const FoodImg = ({ src, alt, style }) => (
  <div style={{ position: 'absolute', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 18px rgba(0,0,0,0.15)', zIndex: 4, ...style }}>
    <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
  </div>
)

const Badge = ({ children, style }) => (
  <div style={{
    position: 'absolute', backgroundColor: 'white', borderRadius: '16px',
    padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px',
    boxShadow: '0 4px 22px rgba(0,0,0,0.11)', zIndex: 10, ...style,
  }}>
    {children}
  </div>
)

export default WelcomePage