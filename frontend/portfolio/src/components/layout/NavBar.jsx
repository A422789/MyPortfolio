import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useProfile } from '../../context/ProfileContext';

const NAV_ITEMS = [
  { id: 'overview', name: 'Overview', href: '/#home', sectionId: 'home' },
  { id: 'case-studies', name: 'Case Studies', href: '/projects', sectionId: 'projects' },
  { id: 'experience', name: 'Experience', href: '/experience/ibm', sectionId: 'experience' },
  { id: 'tech-stack', name: 'Tech Stack', href: '/#skills', sectionId: 'skills' },
  { id: 'background', name: 'Background', href: '/#about', sectionId: 'about' },
  { id: 'contact', name: 'Contact', href: '/#contact', sectionId: 'contact' },
];

export default function NavBar() {
  const [scrollState, setScrollState] = useState({ hasScrolled: false, activeSectionId: 'overview' });
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const { profile } = useProfile();

  useEffect(() => {
    const sections = pathname === '/'
      ? NAV_ITEMS.map((item) => ({ id: item.id, element: document.getElementById(item.sectionId) }))
        .filter((section) => section.element)
      : [];
    let frameId = null;

    const updatePosition = () => {
      frameId = null;
      const hasScrolled = window.scrollY > 0;
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 80;
      const activationLine = headerBottom + (window.innerHeight - headerBottom) * 0.25;
      let activeSectionId = 'overview';

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= activationLine) {
          activeSectionId = section.id;
        }
      }

      if (sections.length && hasScrolled && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        activeSectionId = sections[sections.length - 1].id;
      }

      setScrollState((previous) => (
        previous.hasScrolled === hasScrolled && previous.activeSectionId === activeSectionId
          ? previous
          : { hasScrolled, activeSectionId }
      ));
    };

    const scheduleUpdate = () => {
      if (frameId === null) frameId = requestAnimationFrame(updatePosition);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    sections.forEach((section) => resizeObserver.observe(section.element));
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  const getActiveId = () => {
    if (pathname.startsWith('/work') || pathname === '/projects') return 'case-studies';
    if (pathname.startsWith('/experience/')) return 'experience';
    if (pathname === '/') return scrollState.activeSectionId;
    return 'overview';
  };

  const activeId = getActiveId();
  const activeLocation = pathname === '/' ? 'location' : 'page';

  const nameParts = (profile?.name || 'Ahmed Ayyad').split(' ');
  const firstName = nameParts[0]?.toUpperCase() || 'AHMED';
  const lastName = nameParts.slice(1).join(' ')?.toUpperCase() || 'AYYAD';

  return (
    <Disclosure as="nav" className={`fixed w-full z-20 shadow-xl bg-black ${scrollState.hasScrolled ? 'bg-transparent backdrop-blur-3xl' : ''}`}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div ref={headerRef} className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-[#725c02]">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden scale-150 text-[#b49106]" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block scale-150 text-[#b49106]" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between w-full">
            <Link
              to="/#home"
              className="flex shrink-0 items-center text-[#cac7c7] text-2xl sm:text-3xl lg:text-4xl font-medium tracking-widest logo whitespace-nowrap"
            >
              {firstName} {lastName && <span className="text-[#cea605] ml-2" style={{ textShadow: '5px 5px 10px #b49106' }}>{lastName}</span>}
            </Link>

            <div className="hidden sm:ml-4 sm:flex sm:items-center">
              <div className="flex items-center sm:space-x-1 md:space-x-3 lg:space-x-7">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      aria-current={isActive ? activeLocation : undefined}
                      className={`multi-layer-link whitespace-nowrap px-2.5 py-2 text-sm md:text-base lg:text-xl font-medium tracking-wider ${
                        isActive ? 'activeLink' : 'text-[#7d6400] hover:text-[#e3bc20]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden bg-black/95 backdrop-blur-2xl">
        <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <DisclosureButton
                key={item.id}
                as={Link}
                to={item.href}
                aria-current={isActive ? activeLocation : undefined}
                className={`multi-layer-link text-center m-3 block rounded-md px-3 py-2 text-base font-medium ${
                  isActive ? 'activeLink' : 'text-[#7d6400] hover:text-[#e3bc20]'
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
