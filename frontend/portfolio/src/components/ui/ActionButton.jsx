import React from 'react';
import { Link } from 'react-router-dom';

const VARIANTS = {
  'outline-glow':
    'bg-transparent hover:bg-[#f2de8c] text-[#cea605] hover:text-black border-2 border-[#cea605] rounded-2xl py-3 px-6 shadow-[0_0_15px_5px_rgba(206,166,5,0.25)] hover:shadow-[0_0_25px_10px_rgba(206,166,5,0.5)]',
  'solid-gold':
    'bg-[#cea605] hover:bg-[#f2de8c] text-black rounded-xl px-6 py-2.5 text-sm font-normal',
  subtle:
    'bg-[#cea605]/15 hover:bg-[#cea605] text-[#f2de8c] hover:text-black border border-[#cea605]/40 text-xs font-normal shadow-sm',
  glass:
    'bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-xl px-6 py-2.5 text-sm font-normal',
};

const ActionButton = ({
  variant = 'outline-glow',
  href,
  to,
  external = false,
  download,
  type = 'button',
  disabled = false,
  onClick,
  ariaLabel,
  className = '',
  children,
}) => {
  const baseClasses = `inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
    VARIANTS[variant] || VARIANTS['outline-glow']
  } ${className}`.trim();

  if (to) {
    return (
      <Link to={to} onClick={onClick} aria-label={ariaLabel} className={baseClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        onClick={onClick}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      {children}
    </button>
  );
};

export default ActionButton;

