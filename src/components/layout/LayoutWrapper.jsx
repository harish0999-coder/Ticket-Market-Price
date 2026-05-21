import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles = {
  dashboard: 'Dashboard',
  tickets: 'My Tickets',
  analytics: 'Analytics',
  community: 'Community',
  settings: 'Settings',
  help: 'Help & Support',
};

export default function LayoutWrapper({ activeNav, onNavChange, children, searchValue, onSearchChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-dark">
      <Sidebar
        activeNav={activeNav}
        onNavChange={onNavChange}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onMenuToggle={() => setMobileOpen(o => !o)}
          pageTitle={pageTitles[activeNav] || 'Dashboard'}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
