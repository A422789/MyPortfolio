import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { NAV_ITEMS } from '../../constants/navigation';

export default function Navbar() {
  const { profile } = usePortfolio();
  const { activeId, isScrolled } = useScrollSpy(
    NAV_ITEMS.map((item) => item.id),
    120
  );

  let firstName = 'AHMED';
  let lastName = 'AYYAD';
  if (profile?.name) {
    const parts = profile.name.trim().split(' ');
    firstName = parts[0]?.toUpperCase() || 'AHMED';
    lastName = parts.slice(1).join(' ')?.toUpperCase() || 'AYYAD';
  }

  return (
    <Disclosure
      as="nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl shadow-2xl border-b border-[#cea605]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              aria-label="Toggle navigation menu"
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b49106]"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden scale-125 text-[#b49106]"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block scale-125 text-[#b49106]"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between w-full">
            {/* Logo */}
            <a
              href="#home"
              className="flex shrink-0 items-center text-[#cac7c7] text-2xl sm:text-3xl font-medium tracking-widest logo hover:opacity-90 transition-opacity"
            >
              <span>{firstName}</span>
              {lastName && (
                <span
                  className="text-[#cea605] ml-2 font-bold"
                  style={{ textShadow: '0 0 20px rgba(180, 145, 6, 0.5)' }}
                >
                  {lastName}
                </span>
              )}
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex sm:space-x-1 lg:space-x-8 items-center">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`px-3 py-2 text-lg font-medium tracking-wider transition-all duration-300 relative group ${
                        isActive
                          ? 'text-[#cea605] font-semibold'
                          : 'text-[#8c8c8c] hover:text-[#f2de8c]'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#cea605] to-transparent shadow-[0_0_8px_#cea605]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <DisclosurePanel className="sm:hidden bg-black/95 backdrop-blur-2xl border-b border-[#cea605]/20">
        <div className="space-y-2 px-4 pt-4 pb-6 flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <DisclosureButton
                key={item.id}
                as="a"
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`block rounded-lg px-4 py-3 text-center text-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-[#cea605]/15 text-[#cea605] border border-[#cea605]/30'
                    : 'text-[#8c8c8c] hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
