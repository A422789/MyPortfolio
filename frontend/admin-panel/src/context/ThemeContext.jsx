import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

/**
 * ThemeContext for Admin Panel — identical API to portfolio ThemeContext.
 * Uses separate localStorage keys so admin and portfolio can differ.
 */

const STORAGE_VERSION = 'admin_theme_version';
const STORAGE_MODE    = 'admin_theme_mode';

const DEFAULT_VERSION = 'v2';
const DEFAULT_MODE    = 'system';

const ThemeContext = createContext(null);

function resolveMode(mode) {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}

export function ThemeProvider({ children }) {
  const [version, setVersionState] = useState(
    () => localStorage.getItem(STORAGE_VERSION) || DEFAULT_VERSION
  );
  const [mode, setModeState] = useState(
    () => localStorage.getItem(STORAGE_MODE) || DEFAULT_MODE
  );

  useEffect(() => {
    const root = document.documentElement;
    const resolved = resolveMode(mode);
    root.setAttribute('data-version', version);
    root.setAttribute('data-mode', resolved);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      if (version === 'v1') {
        themeColorMeta.content = resolved === 'dark' ? '#000000' : '#fdf8e7';
      } else {
        themeColorMeta.content = resolved === 'dark' ? '#0f172a' : '#f8fafc';
      }
    }
  }, [version, mode]);

  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.setAttribute('data-mode', mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  const setVersion = useCallback((v) => {
    localStorage.setItem(STORAGE_VERSION, v);
    setVersionState(v);
  }, []);

  const setMode = useCallback((m) => {
    localStorage.setItem(STORAGE_MODE, m);
    setModeState(m);
  }, []);

  const resolvedMode = resolveMode(mode);

  return (
    <ThemeContext.Provider value={{ version, mode, resolvedMode, setVersion, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
