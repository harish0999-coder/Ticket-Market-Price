import React from 'react';

const variants = {
  success: 'bg-success/10 text-success border-success/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  warning: 'bg-accent/10 text-accent border-accent/20',
  info: 'bg-info/10 text-info border-info/20',
  purple: 'bg-primary/10 text-primary-light border-primary/20',
  default: 'bg-border-subtle/50 text-text-light border-border-subtle',
};

export default function Badge({ label, variant = 'default', dot = false }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${variants[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${
        variant === 'success' ? 'bg-success' :
        variant === 'danger' ? 'bg-danger' :
        variant === 'warning' ? 'bg-accent' :
        variant === 'info' ? 'bg-info' :
        variant === 'purple' ? 'bg-primary-light' : 'bg-text-muted'
      }`} />}
      {label}
    </span>
  );
}
