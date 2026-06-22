import React from 'react'

const HeroVisual = () => {
  return (
    <div className="relative" style={{ width: '460px', height: '400px', flexShrink: 0 }}>

      {/* Plate */}
      <div style={{
        position: 'absolute',
        width: '260px', height: '260px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 36%, #ffffff 0%, #eae4db 60%, #d8d1c6 100%)',
        boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
        top: '70px', left: '100px',
      }} />

      {/* Salmon – top right */}
      <div style={{ position:'absolute', width:'100px', height:'80px', top:'40px', right:'40px', zIndex:4, borderRadius:'14px', overflow:'hidden', boxShadow:'0 4px 16px rgba(0,0,0,0.14)' }}>
        <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=90&fit=crop" alt="Salmon" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </div>

      {/* Avocado – mid left */}
      <div style={{ position:'absolute', width:'90px', height:'80px', top:'120px', left:'60px', zIndex:4, borderRadius:'14px', overflow:'hidden', boxShadow:'0 4px 16px rgba(0,0,0,0.14)' }}>
        <img src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=90&fit=crop" alt="Avocado" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </div>

      {/* Roasted – bottom right on plate */}
      <div style={{ position:'absolute', width:'96px', height:'78px', bottom:'80px', right:'80px', zIndex:4, borderRadius:'14px', overflow:'hidden', boxShadow:'0 4px 16px rgba(0,0,0,0.14)' }}>
        <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&q=90&fit=crop" alt="Roasted" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </div>

      {/* Herb/greens – top center */}
      <div style={{ position:'absolute', width:'72px', height:'72px', top:'50px', left:'190px', zIndex:3, borderRadius:'12px', overflow:'hidden', boxShadow:'0 4px 16px rgba(0,0,0,0.12)' }}>
        <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=90&fit=crop" alt="Greens" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </div>

      {/* Protein badge */}
      <div style={{ position:'absolute', top:'20px', left:'0px', zIndex:10, backgroundColor:'white', borderRadius:'16px', padding:'10px 14px', display:'flex', alignItems:'center', gap:'10px', boxShadow:'0 4px 20px rgba(0,0,0,0.12)' }}>
        <div style={{ width:'3px', height:'36px', backgroundColor:'#C8651B', borderRadius:'4px' }} />
        <div>
          <p style={{ fontSize:'9px', fontWeight:700, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'2px' }}>PROTEIN</p>
          <p style={{ fontSize:'18px', fontWeight:800, color:'#2C1A0E', lineHeight:1 }}>34g <span style={{ fontSize:'12px', fontWeight:600, color:'#C8651B' }}>High</span></p>
        </div>
      </div>

      {/* Fats badge */}
      <div style={{ position:'absolute', top:'140px', right:'0px', zIndex:10, backgroundColor:'white', borderRadius:'12px', padding:'8px 14px', display:'flex', alignItems:'center', gap:'8px', boxShadow:'0 4px 16px rgba(0,0,0,0.10)' }}>
        <div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#C8651B' }} />
        <p style={{ fontSize:'13px', fontWeight:600, color:'#3D2B1A' }}>Fats 12g</p>
      </div>

      {/* Carbs badge */}
      <div style={{ position:'absolute', bottom:'110px', left:'0px', zIndex:10, backgroundColor:'white', borderRadius:'12px', padding:'8px 14px', display:'flex', alignItems:'center', gap:'8px', boxShadow:'0 4px 16px rgba(0,0,0,0.10)' }}>
        <div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#C8651B' }} />
        <p style={{ fontSize:'13px', fontWeight:600, color:'#3D2B1A' }}>Carbs 45g</p>
      </div>

      {/* Meal Score badge */}
      <div style={{ position:'absolute', bottom:'20px', right:'0px', zIndex:10, backgroundColor:'white', borderRadius:'18px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'12px', boxShadow:'0 4px 24px rgba(0,0,0,0.12)', minWidth:'170px' }}>
        <div style={{ width:'50px', height:'50px', borderRadius:'50%', border:'2.5px solid #4CAF50', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontSize:'18px', fontWeight:800, color:'#4CAF50' }}>92</span>
        </div>
        <div>
          <p style={{ fontSize:'14px', fontWeight:700, color:'#2C1A0E' }}>Meal Score</p>
          <p style={{ fontSize:'12px', fontWeight:500, color:'#4CAF50' }}>Excellent Balance</p>
        </div>
      </div>

    </div>
  )
}

export default HeroVisual