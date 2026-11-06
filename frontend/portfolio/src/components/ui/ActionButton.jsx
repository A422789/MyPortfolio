import { Link } from 'react-router-dom';

const VARIANTS = {
  'outline-glow':
    'bg-transparent text-[#cea605] hover:text-[#f2de8c] border-2 border-[#cea605] rounded-2xl py-3 px-6 shadow-[0_0_15px_5px_rgba(206,166,5,0.25)] hover:shadow-[0_0_25px_10px_rgba(206,166,5,0.5)]',
  'outline-muted':
    'bg-transparent text-[#c4b27c] hover:text-[#d6c38b] border-2 border-[#725c02] hover:border-[#9b853f] rounded-2xl py-3 px-6 shadow-[0_0_14px_rgba(206,166,5,0.2)] hover:shadow-[0_0_22px_rgba(206,166,5,0.35)]',
  'solid-gold':
    'bg-[#cea605] hover:bg-[#f2de8c] text-black rounded-xl px-6 py-2.5 text-sm font-normal',
  subtle:
    'bg-transparent text-[#f2de8c] border border-[#cea605]/40 hover:border-[#cea605] hover:shadow-[0_0_20px_rgba(206,166,5,0.25)] text-xs font-normal shadow-sm',
  glass:
    'bg-transparent text-white border border-white/15 hover:border-white/50 hover:shadow-[0_0_16px_rgba(255,255,255,0.1)] rounded-xl px-6 py-2.5 text-sm font-normal',
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

