import React, { useState, useMemo } from 'react';
import { Filter, Plus } from 'lucide-react';
import TicketCard from '../components/dashboard/TicketCard';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Badge from '../components/common/Badge';
import { tickets } from '../utils/mockData';

const ALL = 'all';
const statuses = [ALL, 'active', 'listed', 'pending', 'sold'];
const categories = [ALL, 'Concert', 'Sports', 'Festival', 'Theatre'];

export default function TicketsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [categoryFilter, setCategoryFilter] = useState(ALL);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return tickets.filter(t => {
      const matchSearch = t.event.toLowerCase().includes(search.toLowerCase()) ||
        t.venue.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === ALL || t.status === statusFilter;
      const matchCat = categoryFilter === ALL || t.category === categoryFilter;
      return matchSearch && matchStatus && matchCat;
    });
  }, [search, statusFilter, categoryFilter]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-2xl text-white">My Tickets</h2>
          <p className="text-text-muted text-sm mt-1">{filtered.length} ticket{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <Button variant="primary" icon={Plus}>Add Ticket</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search events or venues..."
          className="flex-1"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all
                ${statusFilter === s
                  ? 'bg-primary text-white border-primary'
                  : 'bg-bg-card text-text-muted border-border-subtle hover:border-primary/40'}`}
            >
              {s === ALL ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all
              ${categoryFilter === c
                ? 'bg-accent text-bg-dark border-accent'
                : 'bg-bg-card text-text-muted border-border-subtle hover:border-accent/40'}`}
          >
            {c === ALL ? 'All Categories' : c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} onClick={() => setSelected(ticket)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-bg-card border border-border-subtle flex items-center justify-center mx-auto mb-4">
            <Filter size={24} className="text-text-muted" />
          </div>
          <p className="text-white font-semibold">No tickets found</p>
          <p className="text-text-muted text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Ticket Details">
        {selected && (
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-border-subtle">
              <h3 className="font-heading font-bold text-xl text-white">{selected.event}</h3>
              <p className="text-text-muted text-sm mt-1">{selected.venue}</p>
              <div className="mt-2">
                <Badge label={selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                  variant={{ active: 'success', sold: 'danger', pending: 'warning', listed: 'info' }[selected.status]}
                  dot />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['Date', selected.date], ['Time', selected.time], ['Section', selected.section],
                ['Row', selected.row], ['Seat', selected.seat], ['Category', selected.category]
              ].map(([l, v]) => (
                <div key={l} className="bg-bg-dark/60 rounded-xl p-3">
                  <p className="text-xs text-text-muted mb-1">{l}</p>
                  <p className="text-sm font-semibold text-white">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-text-muted text-xs">Ticket Value</p>
                <p className="font-heading font-bold text-2xl text-white">₹{selected.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>Close</Button>
                {selected.status === 'active' && <Button variant="primary" size="sm">List for Sale</Button>}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
