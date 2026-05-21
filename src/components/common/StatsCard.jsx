import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ title, value, change, changeType, icon: Icon, color, subtitle }) {
  const isPositive = changeType === 'positive';
  const colorMap = {
    purple: 'from-primary/20 to-primary/5 border-primary/20 text-primary-light',
    amber: 'from-accent/20 to-accent/5 border-accent/20 text-accent',
    green: 'from-success/20 to-success/5 border-success/20 text-success',
    blue: 'from-info/20 to-info/5 border-info/20 text-info',
  };
  const iconBg = colorMap[color] || colorMap.purple;

  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl2 p-5 hover:border-primary/30 hover:shadow-card transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${iconBg} border`}>
          <Icon size={18} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
          isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
        }`}>
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(change)}%
        </div>
      </div>

      <div>
        <p className="text-text-muted text-sm font-medium mb-1">{title}</p>
        <h3 className="font-heading font-bold text-2xl text-white tracking-tight">{value}</h3>
        {subtitle && <p className="text-text-muted text-xs mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
