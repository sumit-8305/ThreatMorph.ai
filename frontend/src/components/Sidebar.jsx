import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  History,
  ScanLine,
  Settings,
  BookText,
  MessageCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        'h-full flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(30,30,30,0.95) 60%, rgba(60,60,60,0.85) 100%)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        borderRight: '1px solid #312e42',
      }}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={toggleSidebar}
          className="text-[#B095FF] hover:text-white focus:outline-none"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Logo Section */}
      <div className="px-4 py-3 mb-4 flex items-center justify-center">
        {/* Always show logo, show name only on md+ screens and when not collapsed */}
        <a href="/" className="flex items-center space-x-2 w-full justify-center">
          <img
            src="/logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="rounded"
            style={{ minWidth: 36, minHeight: 36 }}
          />
          {/* Show name only on md+ and not collapsed */}
          <span
            className={clsx(
              'ml-2 font-extrabold tracking-wide text-lg transition-all',
              'hidden md:inline',
              { 'opacity-0 w-0': collapsed, 'text-[#B095FF]': !collapsed }
            )}
            style={{
              fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
              textShadow: '0 2px 12px rgba(176,149,255,0.18), 0 1px 6px rgba(0,0,0,0.18)',
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.3s, width 0.3s',
            }}
          >
            ThreatMorph.ai
          </span>
        </a>
      </div>

      {/* Links */}
      <nav className="flex-1 px-2 space-y-1">
        <NavItem to="/dashboard" end icon={<LayoutDashboard />} label="Dashboard" collapsed={collapsed} />
        <NavItem to="/dashboard/scan" icon={<ScanLine />} label="New Scan" collapsed={collapsed} />
        <NavItem to="/dashboard/previous-scans" icon={<History />} label="Previous Scans" collapsed={collapsed} />
        <NavItem to="/dashboard/settings" icon={<Settings />} label="Settings" collapsed={collapsed} />
        <NavItem to="/dashboard/docs" icon={<BookText />} label="Docs" collapsed={collapsed} />
        <NavItem to="/dashboard/feedback" icon={<MessageCircle />} label="Feedback" collapsed={collapsed} />
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-800 hover:text-[#B095FF] transition-colors border-t border-gray-700"
      >
        <LogOut className="w-5 h-5" />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
}

function NavItem({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-[#232136]',
          isActive ? 'bg-[#B095FF] text-black' : 'text-[#E0D7FF]'
        )
      }
    >
      <span className="w-5 h-5">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
