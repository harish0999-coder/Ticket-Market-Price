import React from 'react';

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white shadow-glow-sm hover:shadow-glow',
  secondary: 'bg-bg-card hover:bg-bg-card-hover text-text-light border border-border-subtle hover:border-primary/40',
  ghost: 'text-text-muted hover:text-white hover:bg-bg-card',
  danger: 'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({ children, variant = 'primary', size = 'md', onClick, className = '', disabled = false, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-200
        ${variants[variant]} ${sizes[size]} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}
