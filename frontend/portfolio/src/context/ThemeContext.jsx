import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

/**
 * ThemeContext — single theme (v1 Classic)
 * Controls only color mode: 'light' | 'dark' | 'system'
 * Version is hardcoded to 'v1'.
 */

const STORAGE_MODE = 'portfolio_theme_mode';
const DEFAULT_MODE = 'system';

const ThemeContext = createContext(null);

function resolveMode(mode) {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(
    () => localStorage.getItem(STORAGE_MODE) || DEFAULT_MODE
  );

  useEffect(() => {
    const root = document.documentElement;
    const resolved = resolveMode(mode);

    root.setAttribute('data-version', 'v1');
    root.setAttribute('data-mode', resolved);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = resolved === 'dark' ? '#000000' : '#fdf8e7';
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.setAttribute('data-mode', mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  const setMode = useCallback((m) => {
    localStorage.setItem(STORAGE_MODE, m);
    setModeState(m);
  }, []);

  const resolvedMode = resolveMode(mode);

  return (
    <ThemeContext.Provider value={{ version: 'v1', mode, resolvedMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
