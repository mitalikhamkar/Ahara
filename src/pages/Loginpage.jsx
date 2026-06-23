import React, { useState } from 'react'

const LoginPage = ({ onBack, onCreateAccount, onComplete }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0EBE0', display: 'flex', flexDirection: 'column' }}>

      {/* Top navbar */}
      <nav style={{ padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M11 2v20M7 2v6a4 4 0 0 0 4 4M17 2c0 0 2 2 2 6s-2 6-2 6v8" stroke="#C8651B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: '#2C1A0E', fontWeight: 700, fontSize: '16px' }}>Ahara</span>
        </div>
        <button
          style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #D4C8B8', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A6A5A' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 40px 40px' }}>
        <div style={{ width: '100%', maxWidth: '860px', display: 'flex', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', backgroundColor: 'white' }}>

          {/* Left Panel – image */}
          <div style={{ width: '42%', position: 'relative', minHeight: '520px', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=90&fit=crop"
              alt="Healthy food bowl"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,15,5,0.75) 0%, rgba(30,15,5,0.2) 50%, transparent 100%)' }} />

            {/* Text on image */}
            <div style={{ position: 'absolute', bottom: '100px', left: '24px', right: '24px', zIndex: 2 }}>
              <h3 style={{ color: 'white', fontWeight: 800, fontSize: '22px', lineHeight: 1.3, margin: '0 0 8px 0' }}>
                Fuel your potential with precise nutrition.
              </h3>
            </div>

            {/* Stats cards at bottom */}
            <div style={{ position: 'absolute', bottom: '20px', left: '16px', right: '16px', zIndex: 2, display: 'flex', gap: '8px' }}>
              {/* Protein Goal */}
              <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderRadius: '14px', padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Progress ring */}
                  <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: 0 }}>
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#E8E0D8" strokeWidth="3.5" />
                      <circle
                        cx="20" cy="20" r="16" fill="none"
                        stroke="#4CAF50" strokeWidth="3.5"
                        strokeDasharray={`${2 * Math.PI * 16 * 0.7} ${2 * Math.PI * 16 * 0.3}`}
                        strokeLinecap="round"
                        transform="rotate(-90 20 20)"
                      />
                    </svg>
                    <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#4CAF50' }}>70%</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', color: '#7A6A5A', margin: '0 0 2px 0' }}>Protein Goal</p>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: '#2C1A0E', margin: 0 }}>
                      112g <span style={{ fontSize: '11px', fontWeight: 500, color: '#7A6A5A' }}>/160g</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini stats */}
            <div style={{ position: 'absolute', bottom: '20px', left: '16px', right: '16px', zIndex: 2, display: 'none' }} />
          </div>

          {/* Right Panel – form */}
          <div style={{ flex: 1, padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2C1A0E', margin: '0 0 8px 0' }}>Welcome back</h2>
            <p style={{ fontSize: '14px', color: '#7A6A5A', lineHeight: 1.6, margin: '0 0 32px 0' }}>
              Log in to your Ahara account to continue your{' '}
              <span style={{ color: '#C8651B' }}>wellness journey.</span>
            </p>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#3D2B1A', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. name@example.com"
                style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid transparent', backgroundColor: '#F5EFE6', fontSize: '14px', color: '#3D2B1A', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#C8651B'}
                onBlur={e => e.target.style.borderColor = 'transparent'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D2B1A' }}>Password</label>
                <span style={{ fontSize: '12px', color: '#C8651B', fontWeight: 600, cursor: 'pointer' }}>Forgot Password?</span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{ width: '100%', padding: '13px 48px 13px 16px', borderRadius: '12px', border: '1.5px solid transparent', backgroundColor: '#F5EFE6', fontSize: '14px', color: '#3D2B1A', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#C8651B'}
                  onBlur={e => e.target.style.borderColor = 'transparent'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7A6A5A', padding: 0, display: 'flex' }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', cursor: 'pointer' }} onClick={() => setRememberMe(!rememberMe)}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1.5px solid ${rememberMe ? '#C8651B' : '#C8C0B4'}`, backgroundColor: rememberMe ? '#C8651B' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                {rememberMe && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: '13px', color: '#3D2B1A' }}>Remember Me</span>
            </div>

            {/* Login button */}
            <button
              onClick={onComplete} style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: '#E8750A', color: 'white', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer', marginBottom: '20px', transition: 'opacity 0.2s' }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.92'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              Login
            </button>

            {/* Create account */}
            <p style={{ textAlign: 'center', fontSize: '14px', color: '#7A6A5A', marginBottom: '24px' }}>
              Don't have an account?{' '}
              <span
                onClick={onCreateAccount}
                style={{ color: '#C8651B', fontWeight: 700, cursor: 'pointer' }}
              >
                Create Account
              </span>
            </p>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E8E0D8' }} />
              <span style={{ fontSize: '12px', color: '#7A6A5A', whiteSpace: 'nowrap', fontWeight: 500 }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E8E0D8' }} />
            </div>

            {/* Social buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, padding: '11px 16px', borderRadius: '12px', border: '1.5px solid #E8E0D8', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#3D2B1A', transition: 'border-color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#C8651B'}
                onMouseOut={e => e.currentTarget.style.borderColor = '#E8E0D8'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button style={{ flex: 1, padding: '11px 16px', borderRadius: '12px', border: '1.5px solid #E8E0D8', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#3D2B1A', transition: 'border-color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#C8651B'}
                onMouseOut={e => e.currentTarget.style.borderColor = '#E8E0D8'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8DDD0' }}>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#C8651B' }}>Ahara</span>
        <div style={{ display: 'flex', gap: '28px' }}>
          {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
            <span key={link} style={{ fontSize: '13px', color: '#7A6A5A', cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.color = '#C8651B'}
              onMouseOut={e => e.currentTarget.style.color = '#7A6A5A'}
            >{link}</span>
          ))}
        </div>
        <span style={{ fontSize: '12px', color: '#B0A090' }}>© 2024 Ahara Premium Nutrition. All rights reserved.</span>
      </footer>

    </div>
  )
}

export default LoginPage