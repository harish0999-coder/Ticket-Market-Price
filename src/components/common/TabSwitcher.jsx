import React from 'react';

export default function TabSwitcher({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-1 bg-bg-card border border-border-subtle rounded-xl p-1">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
            ${activeTab === tab.id
              ? 'bg-primary text-white shadow-glow-sm'
              : 'text-text-muted hover:text-text-light'}
          `}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-white/20' : 'bg-border-subtle'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
