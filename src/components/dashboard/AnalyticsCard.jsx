import React from 'react';

export default function AnalyticsCard({ title, children, className = '', action }) {
  return (
    <div className={`bg-bg-card border border-border-subtle rounded-xl2 p-5 ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading font-semibold text-white text-base">{title}</h3>
        {action && (
          <button className="text-xs text-primary-light hover:text-white font-medium transition-colors">
            {action}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
