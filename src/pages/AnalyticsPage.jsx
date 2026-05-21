import React, { useState } from 'react';
import { TrendingUp, DollarSign, Ticket, BarChart2 } from 'lucide-react';
import AnalyticsCard from '../components/dashboard/AnalyticsCard';
import TabSwitcher from '../components/common/TabSwitcher';
import { statsData, tickets } from '../utils/mockData';

const categoryBreakdown = [
  { label: 'Concert', count: 2, revenue: 16500, color: 'bg-primary-light', pct: 45 },
  { label: 'Sports', count: 2, revenue: 9500, color: 'bg-info', pct: 30 },
  { label: 'Festival', count: 1, revenue: 3200, color: 'bg-success', pct: 15 },
  { label: 'Theatre', count: 1, revenue: 2000, color: 'bg-accent', pct: 10 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('monthly');

  const tabs = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  const maxRevenue = Math.max(...statsData.map(d => d.revenue));

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-2xl text-white">Analytics</h2>
          <p className="text-text-muted text-sm mt-1">Track your ticket portfolio performance</p>
        </div>
        <TabSwitcher tabs={tabs} activeTab={period} onTabChange={setPeriod} />
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹30,700', icon: DollarSign, color: 'text-success' },
          { label: 'Total Spent', value: '₹18,900', icon: TrendingUp, color: 'text-danger' },
          { label: 'Net Profit', value: '₹11,800', icon: BarChart2, color: 'text-primary-light' },
          { label: 'Tickets Traded', value: '6', icon: Ticket, color: 'text-accent' },
        ].map(item => (
          <div key={item.label} className="bg-bg-card border border-border-subtle rounded-xl2 p-5">
            <div className={`mb-3 ${item.color}`}>
              <item.icon size={20} />
            </div>
            <p className="text-text-muted text-xs mb-1">{item.label}</p>
            <p className="font-heading font-bold text-xl text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Bar chart */}
        <AnalyticsCard title="Revenue vs Spend" className="lg:col-span-2">
          <div className="space-y-3">
            {statsData.map(d => (
              <div key={d.month} className="flex items-center gap-4">
                <span className="text-xs text-text-muted w-8 flex-shrink-0">{d.month}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 bg-gradient-to-r from-primary to-primary-light rounded-full transition-all"
                      style={{ width: `${(d.revenue / maxRevenue) * 100}%` }}
                    />
                    <span className="text-xs text-text-muted font-mono">₹{(d.revenue / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 bg-gradient-to-r from-border-subtle to-text-muted/50 rounded-full transition-all"
                      style={{ width: `${(d.spent / maxRevenue) * 100}%` }}
                    />
                    <span className="text-xs text-text-muted font-mono">₹{(d.spent / 1000).toFixed(1)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border-subtle">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <div className="w-3 h-2 rounded-sm bg-primary-light" /> Revenue
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <div className="w-3 h-2 rounded-sm bg-border-subtle" /> Spent
            </div>
          </div>
        </AnalyticsCard>

        {/* Category breakdown */}
        <AnalyticsCard title="Category Breakdown">
          <div className="space-y-4">
            {categoryBreakdown.map(cat => (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                    <span className="text-sm text-text-light">{cat.label}</span>
                  </div>
                  <span className="text-xs font-mono text-text-muted">₹{cat.revenue.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-bg-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all`}
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-1">{cat.count} ticket{cat.count > 1 ? 's' : ''} · {cat.pct}%</p>
              </div>
            ))}
          </div>
        </AnalyticsCard>
      </div>
    </div>
  );
}
