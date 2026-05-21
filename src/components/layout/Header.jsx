import React from 'react';
import { Menu, Bell, Search, SlidersHorizontal } from 'lucide-react';

export default function Header({ onMenuToggle, pageTitle, searchValue, onSearchChange }) {
  return (
    <header className="sticky top-0 z-10 bg-glass border-b border-border-subtle px-4 md:px-6 py-4 flex items-center gap-4">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-text-muted hover:text-white hover:bg-bg-card transition-all"
      >
        <Menu size={20} />
      </button>

      {/* Page title (desktop) */}
      <div className="hidden md:block">
        <h1 className="font-heading font-bold text-lg text-white">{pageTitle}</h1>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search events, tickets..."
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full bg-bg-card border border-border-subtle rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary/60 focus:shadow-glow-sm transition-all"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="p-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-muted hover:text-white hover:border-primary/40 transition-all">
          <SlidersHorizontal size={16} />
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-muted hover:text-white hover:border-primary/40 transition-all">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* Avatar (mobile) */}
        <div className="md:hidden w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          AK
        </div>
      </div>
    </header>
  );
}
