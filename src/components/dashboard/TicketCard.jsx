import React from 'react';
import { MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function TicketCard({ ticket, onClick }) {
  const { event, venue, date, time, section, row, seat, price, status, category, image } = ticket;

  const statusVariant = {
    active: 'success',
    sold: 'danger',
    pending: 'warning',
    listed: 'info',
  }[status] || 'default';

  const categoryColors = {
    Concert: 'from-purple-500 to-pink-500',
    Sports: 'from-blue-500 to-cyan-500',
    Theatre: 'from-amber-500 to-orange-500',
    Festival: 'from-green-500 to-emerald-500',
  };

  const gradient = categoryColors[category] || 'from-primary to-primary-dark';

  return (
    <div
      onClick={onClick}
      className="bg-bg-card border border-border-subtle rounded-xl2 overflow-hidden hover:border-primary/40 hover:shadow-card transition-all duration-300 cursor-pointer group"
    >
      {/* Color bar top */}
      <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="font-heading font-bold text-white text-base leading-snug truncate group-hover:text-primary-light transition-colors">
              {event}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-text-muted text-xs">
              <MapPin size={11} />
              <span className="truncate">{venue}</span>
            </div>
          </div>
          <Badge label={status.charAt(0).toUpperCase() + status.slice(1)} variant={statusVariant} dot />
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-bg-dark/50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-text-muted text-xs mb-1">
              <Calendar size={11} />
              <span>Date</span>
            </div>
            <p className="text-white text-sm font-semibold">{date}</p>
          </div>
          <div className="bg-bg-dark/50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-text-muted text-xs mb-1">
              <Clock size={11} />
              <span>Time</span>
            </div>
            <p className="text-white text-sm font-semibold">{time}</p>
          </div>
        </div>

        {/* Seat info */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-text-muted">Sec</span>
          <span className="text-xs font-mono font-semibold text-white bg-border-subtle px-2 py-0.5 rounded">{section}</span>
          <span className="text-xs text-text-muted">Row</span>
          <span className="text-xs font-mono font-semibold text-white bg-border-subtle px-2 py-0.5 rounded">{row}</span>
          <span className="text-xs text-text-muted">Seat</span>
          <span className="text-xs font-mono font-semibold text-white bg-border-subtle px-2 py-0.5 rounded">{seat}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
          <div>
            <p className="text-xs text-text-muted">Value</p>
            <p className="font-heading font-bold text-lg text-white">₹{price.toLocaleString()}</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-primary-light hover:text-white font-medium transition-colors">
            View Details
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
