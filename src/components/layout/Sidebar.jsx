import React from 'react';
import {
  LayoutDashboard, Ticket, TrendingUp, Users, Settings,
  HelpCircle, LogOut, Zap, ChevronRight
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tickets', label: 'My Tickets', icon: Ticket },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'community', label: 'Community', icon: Users },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export default function Sidebar({ activeNav, onNavChange, mobileOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-bg-sidebar border-r border-border-subtle z-30
          flex flex-col transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-border-subtle">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-sm">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-white tracking-tight">Reelax</span>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest px-4 mb-3">
            Main Menu
          </p>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { onNavChange(id); onClose?.(); }}
              className={`sidebar-link w-full text-left ${activeNav === id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span className="text-sm">{label}</span>
              {activeNav === id && (
                <ChevronRight size={14} className="ml-auto text-primary-light" />
              )}
            </button>
          ))}

          <div className="pt-4">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-widest px-4 mb-3">
              Account
            </p>
            {bottomItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { onNavChange(id); onClose?.(); }}
                className={`sidebar-link w-full text-left ${activeNav === id ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="px-3 pb-4 border-t border-border-subtle pt-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-card hover:bg-bg-card-hover transition-all cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Arjun Kumar</p>
              <p className="text-xs text-text-muted truncate">arjun@email.com</p>
            </div>
            <LogOut size={15} className="text-text-muted group-hover:text-danger transition-colors flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
