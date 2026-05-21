import React from 'react';
import { Users, MessageSquare, Star, TrendingUp } from 'lucide-react';
import AnalyticsCard from '../components/dashboard/AnalyticsCard';
import Badge from '../components/common/Badge';

const members = [
  { name: 'Priya Sharma', trades: 24, rating: 4.9, badge: 'Top Trader', joined: 'Jan 2024' },
  { name: 'Rahul Mehta', trades: 18, rating: 4.7, badge: 'Verified', joined: 'Mar 2024' },
  { name: 'Sneha Patel', trades: 31, rating: 5.0, badge: 'Top Trader', joined: 'Dec 2023' },
  { name: 'Vikram Nair', trades: 12, rating: 4.5, badge: 'Active', joined: 'Apr 2024' },
];

const discussions = [
  { title: 'Coldplay tickets — worth the markup?', replies: 34, category: 'Concert', time: '2h ago' },
  { title: 'IPL Final seat recommendations?', replies: 21, category: 'Sports', time: '5h ago' },
  { title: 'Best time to list Sunburn tickets', replies: 15, category: 'Festival', time: '1d ago' },
  { title: 'How to verify authenticity?', replies: 48, category: 'General', time: '2d ago' },
];

export default function CommunityPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-white">Community</h2>
        <p className="text-text-muted text-sm mt-1">Connect with fellow ticket traders</p>
      </div>

      {/* Stats banner */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Members', value: '12,840', icon: Users },
          { label: 'Discussions', value: '4,210', icon: MessageSquare },
          { label: 'Avg Rating', value: '4.8★', icon: Star },
        ].map(item => (
          <div key={item.label} className="bg-bg-card border border-border-subtle rounded-xl2 p-4 text-center">
            <item.icon size={18} className="text-primary-light mx-auto mb-2" />
            <p className="font-heading font-bold text-xl text-white">{item.value}</p>
            <p className="text-xs text-text-muted mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top traders */}
        <AnalyticsCard title="Top Traders" action="View all">
          <div className="space-y-3">
            {members.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3 p-3 bg-bg-dark/50 rounded-xl hover:bg-bg-card-hover transition-colors cursor-pointer">
                <span className="text-xs font-bold text-text-muted w-5 text-center">{i + 1}</span>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{m.name}</p>
                  <p className="text-xs text-text-muted">{m.trades} trades · ⭐ {m.rating}</p>
                </div>
                <Badge
                  label={m.badge}
                  variant={m.badge === 'Top Trader' ? 'purple' : m.badge === 'Verified' ? 'success' : 'info'}
                />
              </div>
            ))}
          </div>
        </AnalyticsCard>

        {/* Discussions */}
        <AnalyticsCard title="Recent Discussions" action="Start discussion">
          <div className="space-y-3">
            {discussions.map((d, i) => (
              <div key={i} className="p-3 bg-bg-dark/50 rounded-xl hover:bg-bg-card-hover transition-colors cursor-pointer">
                <div className="flex items-start gap-2 mb-2">
                  <p className="text-sm font-medium text-white flex-1">{d.title}</p>
                  <Badge label={d.category} variant="purple" />
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><MessageSquare size={11} /> {d.replies} replies</span>
                  <span>{d.time}</span>
                </div>
              </div>
            ))}
          </div>
        </AnalyticsCard>
      </div>
    </div>
  );
}
