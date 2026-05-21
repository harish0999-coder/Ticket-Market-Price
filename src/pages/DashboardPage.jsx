import React, { useState } from 'react';
import {
  Ticket, DollarSign, TrendingUp, Calendar,
  ArrowUpRight, ArrowDownRight, Sparkles, Clock
} from 'lucide-react';
import StatsCard from '../components/common/StatsCard';
import AnalyticsCard from '../components/dashboard/AnalyticsCard';
import TabSwitcher from '../components/common/TabSwitcher';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import DataTable from '../components/dashboard/DataTable';
import Modal from '../components/common/Modal';
import TicketCard from '../components/dashboard/TicketCard';
import { tickets, transactions, statsData, upcomingEvents } from '../utils/mockData';

const statsCards = [
  { title: 'Active Tickets', value: '4', change: 33, changeType: 'positive', icon: Ticket, color: 'purple', subtitle: 'vs last month' },
  { title: 'Total Revenue', value: '₹30,700', change: 12, changeType: 'positive', icon: DollarSign, color: 'green', subtitle: 'All time sales' },
  { title: 'ROI', value: '+62%', change: 8, changeType: 'positive', icon: TrendingUp, color: 'amber', subtitle: 'Portfolio return' },
  { title: 'Upcoming Events', value: '3', change: 50, changeType: 'positive', icon: Calendar, color: 'blue', subtitle: 'Next 30 days' },
];

const txnColumns = [
  { key: 'id', label: 'ID', sortable: false },
  { key: 'event', label: 'Event', sortable: true },
  {
    key: 'type', label: 'Type', sortable: true,
    render: (v) => (
      <Badge
        label={v}
        variant={v === 'Purchase' ? 'info' : v === 'Sale' ? 'success' : 'warning'}
      />
    )
  },
  {
    key: 'amount', label: 'Amount', sortable: true,
    render: (v, row) => (
      <span className={`font-mono font-semibold ${row.type === 'Sale' ? 'text-success' : 'text-white'}`}>
        {row.type === 'Sale' ? '+' : '-'}₹{v.toLocaleString()}
      </span>
    )
  },
  { key: 'date', label: 'Date', sortable: true },
  {
    key: 'status', label: 'Status', sortable: true,
    render: (v) => (
      <Badge
        label={v.charAt(0).toUpperCase() + v.slice(1)}
        variant={v === 'completed' ? 'success' : v === 'pending' ? 'warning' : 'info'}
        dot
      />
    )
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tickets', label: 'Tickets', count: tickets.length },
    { id: 'transactions', label: 'Transactions', count: transactions.length },
  ];

  // Mini bar chart (pure CSS/SVG, no library)
  const maxRevenue = Math.max(...statsData.map(d => d.revenue));

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Welcome banner */}
      <div className="relative rounded-xl2 overflow-hidden bg-gradient-to-br from-primary/30 via-primary/10 to-bg-card border border-primary/20 p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">Welcome back</span>
            </div>
            <h2 className="font-heading font-bold text-2xl text-white">Arjun Kumar</h2>
            <p className="text-text-muted text-sm mt-1">You have <span className="text-primary-light font-semibold">3 upcoming events</span> in the next 30 days.</p>
          </div>
          <Button variant="primary" icon={Ticket}>Sell a Ticket</Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map(card => (
          <StatsCard key={card.title} {...card} />
        ))}
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Revenue chart */}
          <AnalyticsCard title="Revenue Overview" className="lg:col-span-2" action="See full report">
            <div className="flex items-end gap-3 h-36">
              {statsData.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-0.5" style={{ height: '100px' }}>
                    <div
                      className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t-md opacity-90 transition-all hover:opacity-100"
                      style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                      title={`Revenue: ₹${d.revenue}`}
                    />
                    <div
                      className="flex-1 bg-gradient-to-t from-border-subtle to-text-muted/30 rounded-t-md"
                      style={{ height: `${(d.spent / maxRevenue) * 100}%` }}
                      title={`Spent: ₹${d.spent}`}
                    />
                  </div>
                  <span className="text-xs text-text-muted">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border-subtle">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <div className="w-3 h-3 rounded-sm bg-primary-light" />
                Revenue
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <div className="w-3 h-3 rounded-sm bg-border-subtle" />
                Spent
              </div>
              <div className="ml-auto text-xs text-success font-semibold flex items-center gap-1">
                <ArrowUpRight size={13} />
                +12% this month
              </div>
            </div>
          </AnalyticsCard>

          {/* Upcoming events */}
          <AnalyticsCard title="Upcoming Events" action="View all">
            <div className="space-y-3">
              {upcomingEvents.map(ev => (
                <div key={ev.id} className="flex items-center gap-3 p-3 bg-bg-dark/50 rounded-xl hover:bg-bg-card-hover transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-primary-light" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{ev.name}</p>
                    <p className="text-xs text-text-muted">{ev.date} · {ev.category}</p>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    ev.daysLeft <= 7 ? 'bg-danger/10 text-danger' :
                    ev.daysLeft <= 30 ? 'bg-accent/10 text-accent' :
                    'bg-success/10 text-success'
                  }`}>
                    {ev.daysLeft}d
                  </div>
                </div>
              ))}
            </div>
          </AnalyticsCard>

          {/* Recent tickets preview */}
          <AnalyticsCard title="Recent Tickets" className="lg:col-span-3" action="View all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tickets.slice(0, 3).map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} onClick={() => setSelectedTicket(ticket)} />
              ))}
            </div>
          </AnalyticsCard>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} onClick={() => setSelectedTicket(ticket)} />
          ))}
        </div>
      )}

      {activeTab === 'transactions' && (
        <AnalyticsCard title="Transaction History">
          <DataTable data={transactions} columns={txnColumns} />
        </AnalyticsCard>
      )}

      {/* Ticket Detail Modal */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title="Ticket Details"
        size="md"
      >
        {selectedTicket && (
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-border-subtle">
              <h3 className="font-heading font-bold text-xl text-white">{selectedTicket.event}</h3>
              <p className="text-text-muted text-sm mt-1">{selectedTicket.venue}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Date', selectedTicket.date],
                ['Time', selectedTicket.time],
                ['Section', selectedTicket.section],
                ['Row', selectedTicket.row],
                ['Seat', selectedTicket.seat],
                ['Category', selectedTicket.category],
              ].map(([label, val]) => (
                <div key={label} className="bg-bg-dark/60 rounded-xl p-3">
                  <p className="text-xs text-text-muted mb-1">{label}</p>
                  <p className="text-sm font-semibold text-white">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-text-muted text-xs">Ticket Value</p>
                <p className="font-heading font-bold text-2xl text-white">₹{selectedTicket.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setSelectedTicket(null)}>Close</Button>
                {selectedTicket.status === 'active' && (
                  <Button variant="primary" size="sm">List for Sale</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
