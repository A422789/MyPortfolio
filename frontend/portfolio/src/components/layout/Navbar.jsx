import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { NAV_ITEMS } from '../../constants/navigation';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const { profile } = usePortfolio();
  const { activeId, isScrolled } = useScrollSpy(
    NAV_ITEMS.map((item) => item.id),
    120
  );

  let firstName = 'AHMED';
  let lastName  = 'AYYAD';
  if (profile?.name) {
    const parts = profile.name.trim().split(' ');
    firstName = parts[0]?.toUpperCase() || 'AHMED';
    lastName  = parts.slice(1).join(' ')?.toUpperCase() || 'AYYAD';
  }

  return (
    <Disclosure
      as="nav"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl shadow-[var(--elevation-1,none)]'
          : 'bg-transparent'
      }`}
      style={isScrolled ? { backgroundColor: 'var(--color-nav-bg)' } : {}}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              aria-label="Toggle navigation menu"
              className="group relative inline-flex items-center justify-center rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2"
              style={{ color: 'var(--color-text-3)', '--tw-ring-color': 'var(--color-accent)' }}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden scale-125" style={{ color: 'var(--color-accent)' }} />
              <XMarkIcon  aria-hidden="true" className="hidden size-6 group-data-[open]:block scale-125" style={{ color: 'var(--color-accent)' }} />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between w-full">
            {/* Logo */}
            <a
              href="#home"
              className="logo flex shrink-0 items-center text-2xl sm:text-3xl font-medium tracking-widest hover:opacity-90 transition-opacity"
              style={{ color: 'var(--color-text-2)' }}
            >
              <span>{firstName}</span>
              {lastName && (
                <span
                  className="ml-2 font-bold"
                  style={{
                    color: 'var(--color-accent)',
                    textShadow: 'var(--text-shadow-logo, none)',
                  }}
                >
                  {lastName}
                </span>
              )}
            </a>

            {/* Desktop: Nav Links + ThemeSwitcher */}
            <div className="hidden sm:flex sm:ml-6 items-center gap-4">
              <div className="flex sm:space-x-1 lg:space-x-4 items-center">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className="nav-link px-3 py-2 text-base font-medium tracking-wide transition-all duration-300 relative group"
                      style={{
                        color: isActive ? 'var(--color-nav-link-active)' : 'var(--color-nav-link)',
                        fontWeight: isActive ? '600' : '500',
                      }}
                    >
                      {item.name}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                          style={{
                            background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)',
                            boxShadow: '0 0 8px var(--color-accent)',
                          }}
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Theme Switcher — desktop */}
              <ThemeSwitcher compact />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <DisclosurePanel
        className="sm:hidden border-b"
        style={{ backgroundColor: 'var(--color-nav-bg)', borderColor: 'var(--color-border)' }}
      >
        <div className="space-y-2 px-4 pt-4 pb-4 flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <DisclosureButton
                key={item.id}
                as="a"
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className="block rounded-lg px-4 py-3 text-center text-base font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? 'var(--color-accent-light)' : 'transparent',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-nav-link)',
                  border: isActive ? '1px solid var(--color-border-accent)' : '1px solid transparent',
                }}
              >
                {item.name}
              </DisclosureButton>
            );
          })}

          {/* Theme Switcher — mobile */}
          <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs font-semibold mb-2 px-1 uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>
              Theme
            </p>
            <ThemeSwitcher />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
