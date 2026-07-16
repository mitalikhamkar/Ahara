import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, Utensils, ScanLine, Calendar, LineChart, User, MessageSquareHeart, Leaf, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/app', end: true, icon: LayoutGrid, label: 'Overview' },
  { to: '/app/meal-builder', icon: Utensils, label: 'Meal Builder' },
  { to: '/app/scanner', icon: ScanLine, label: 'Food Scanner' },
  { to: '/app/assistant', icon: MessageSquareHeart, label: 'AI Coach' },
  { to: '/app/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/app/reports', icon: LineChart, label: 'Reports' },
  { to: '/app/profile', icon: User, label: 'Profile' },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-ahara-bg text-ahara-ink flex" data-testid="dashboard-layout">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-ahara-line bg-white/60 backdrop-blur-sm">
        <div className="px-6 py-6 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-ahara-sage/15 flex items-center justify-center"><Leaf className="w-5 h-5 text-ahara-sage" /></div>
          <div>
            <div className="font-heading font-semibold">Ahara</div>
            <div className="text-[11px] text-ahara-muted -mt-0.5">Nourish, not track</div>
          </div>
        </div>
        <nav className="px-3 flex-1 space-y-1">
          {NAV.map(n => (
            <NavLink
              key={n.to} to={n.to} end={n.end}
              data-testid={`sidebar-${n.label.toLowerCase().replace(/\s/g,'-')}`}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 ${isActive ? 'bg-ahara-sage/10 text-ahara-ink font-medium' : 'text-ahara-muted hover:bg-ahara-mist hover:text-ahara-ink'}`}
            >
              <n.icon className="w-4 h-4" /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4">
          <button
            onClick={() => { logout(); nav('/'); }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-ahara-muted hover:bg-ahara-mist hover:text-ahara-ink transition-colors"
            data-testid="sidebar-logout"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-ahara-line bg-white/70 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <div className="text-xs text-ahara-muted">Welcome back,</div>
            <div className="font-heading text-lg text-ahara-ink" data-testid="header-username">{user?.name || 'Friend'}</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-ahara-mist flex items-center justify-center hover:bg-ahara-mist/80 transition-colors" data-testid="header-bell">
              <Bell className="w-4 h-4 text-ahara-ink" />
            </button>
            <div className="w-9 h-9 rounded-full bg-ahara-sage/15 flex items-center justify-center font-mono text-sm text-ahara-sage">
              {(user?.name || 'A')[0].toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
