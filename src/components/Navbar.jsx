import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-full px-6 md:px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        {/* Fork & Knife Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#C8651B]"
        >
          <path
            d="M11 2v20M7 2v6a4 4 0 0 0 4 4M17 2c0 0 2 2 2 6s-2 6-2 6v8"
            stroke="#C8651B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[#2C1A0E] font-semibold text-base tracking-tight">
          Ahara
        </span>
      </div>
    </nav>
  )
}

export default Navbar