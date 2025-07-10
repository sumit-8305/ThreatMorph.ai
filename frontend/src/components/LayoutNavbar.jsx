import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this import

const LayoutNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <nav
        className="flex justify-between items-center px-8 py-4 border-b border-gray-700 shadow-lg z-50 relative w-full"
        style={{
          background: 'rgba(24, 20, 36, 0.60)', // slightly purple-black, 60% opacity
          backdropFilter: 'blur(10px) saturate(120%)',
          WebkitBackdropFilter: 'blur(10px) saturate(120%)',
          borderBottom: '1px solid #312e42', // subtle purple-gray border
        }}
      >
        {/* Left: Logo and Name */}
        <div className="flex items-center space-x-2">
          {/* Mobile: Show only logo */}
          <div className="block md:hidden">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="rounded p-1"
                style={{ borderRadius: "8px" }} // fallback for visibility
                onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/36x36?text=L";
                }}
              />
            </Link>
          </div>
          {/* Desktop: Show logo and name */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="rounded p-1"
                style={{ borderRadius: "8px" }}
                onError={e => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://via.placeholder.com/36x36?text=L";
                }}
              />
            </Link>
            <span
              className="text-2xl font-extrabold tracking-wide"
              style={{
                fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                textShadow: '0 2px 12px rgba(176,149,255,0.18), 0 1px 6px rgba(0,0,0,0.18)',
                letterSpacing: '0.06em',
              }}
            >
              ThreatMorph.ai
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="transition font-semibold tracking-wide text-lg"
            style={{
              color: '#E0D7FF',
              textShadow: '0 1px 8px rgba(176,149,255,0.10)',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#B095FF')}
            onMouseOut={e => (e.currentTarget.style.color = '#E0D7FF')}
          >
            Home
          </Link>
          <Link
            to="/dashboard/docs"
            className="transition font-semibold tracking-wide text-lg"
            style={{
              color: '#E0D7FF',
              textShadow: '0 1px 8px rgba(176,149,255,0.10)',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#B095FF')}
            onMouseOut={e => (e.currentTarget.style.color = '#E0D7FF')}
          >
            Docs
          </Link>
          <Link
            to="/login"
            className="transition font-semibold tracking-wide text-lg"
            style={{
              color: '#E0D7FF',
              textShadow: '0 1px 8px rgba(176,149,255,0.10)',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#B095FF')}
            onMouseOut={e => (e.currentTarget.style.color = '#E0D7FF')}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="transition font-semibold tracking-wide text-lg"
            style={{
              color: '#E0D7FF',
              textShadow: '0 1px 8px rgba(176,149,255,0.10)',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#B095FF')}
            onMouseOut={e => (e.currentTarget.style.color = '#E0D7FF')}
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
          <button onClick={toggleMenu} className="text-[#B095FF]">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Overlay */}
      {isOpen && (
        <div
          className="absolute top-full right-0 w-[75%] px-8 pb-4 z-40 flex flex-col items-center space-y-3 border-b border-gray-700"
          style={{
            background: 'rgba(24, 20, 36, 0.60)',
            backdropFilter: 'blur(10px) saturate(120%)',
            WebkitBackdropFilter: 'blur(10px) saturate(120%)',
            borderBottom: '1px solid #312e42',
          }}
        >
          <Link to="/" className="text-[#E0D7FF] hover:text-[#B095FF] transition text-center font-semibold tracking-wide text-lg" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/dashboard/docs" className="text-[#E0D7FF] hover:text-[#B095FF] transition text-center font-semibold tracking-wide text-lg" onClick={() => setIsOpen(false)}>Docs</Link>
          <Link to="/login" className="text-[#E0D7FF] hover:text-[#B095FF] transition text-center font-semibold tracking-wide text-lg" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" className="text-[#E0D7FF] hover:text-[#B095FF] transition text-center font-semibold tracking-wide text-lg" onClick={() => setIsOpen(false)}>Register</Link>
        </div>
      )}
    </div>
  );
};

export default LayoutNavbar;