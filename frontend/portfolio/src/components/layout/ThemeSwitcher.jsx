import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeSwitcher — Mode only (Light / Dark / System)
 * Version toggle removed since only Classic (v1) is used.
 */

const MODE_OPTIONS = [
  { value: 'light',  label: 'Light',  icon: SunIcon  },
  { value: 'dark',   label: 'Dark',   icon: MoonIcon },
  { value: 'system', label: 'System', icon: MonitorIcon },
];

function SunIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function MonitorIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path strokeLinecap="round" d="M8 21h8m-4-4v4" />
    </svg>
  );
}

function RadioChip({ value, label, Icon, checked, onChange }) {
  return (
    <label
      className={`
        relative flex items-center gap-1.5 px-2.5 py-1 rounded-md cursor-pointer
        text-xs font-medium tracking-wide select-none
        transition-colors duration-[var(--duration-color)]
        ${checked
          ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)]'
          : 'text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]'
        }
      `}
      title={label}
    >
      <input
        type="radio"
        name="theme-mode"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
        aria-label={label}
      />
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{label}</span>
    </label>
  );
}

export default function ThemeSwitcher({ compact = false }) {
  const { mode, setMode } = useTheme();

  const handleModeKey = (e) => {
    const idx = MODE_OPTIONS.findIndex((o) => o.value === mode);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setMode(MODE_OPTIONS[(idx + 1) % MODE_OPTIONS.length].value);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setMode(MODE_OPTIONS[(idx - 1 + MODE_OPTIONS.length) % MODE_OPTIONS.length].value);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Color mode"
      onKeyDown={handleModeKey}
      className="flex items-center gap-0.5 rounded-lg p-0.5 bg-[var(--color-surface-2)] border border-[var(--color-border)]"
    >
      {MODE_OPTIONS.map((opt) => (
        <RadioChip
          key={opt.value}
          value={opt.value}
          label={opt.label}
          Icon={opt.icon}
          checked={mode === opt.value}
          onChange={setMode}
        />
      ))}
    </div>
  );
}
