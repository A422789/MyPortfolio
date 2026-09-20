import { useState, useEffect } from 'react';

/**
 * Hook to dynamically track the active section in view.
 */
export const useScrollSpy = (sectionIds = [], offset = 100) => {
  const [activeId, setActiveId] = useState(sectionIds[0] || 'home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);

        const scrollPosition = window.scrollY + offset;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const section = document.getElementById(sectionIds[i]);
          if (section) {
            const top = section.offsetTop;
            if (scrollPosition >= top) {
              setActiveId(sectionIds[i]);
              break;
            }
          }
        }
        timeoutId = null;
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sectionIds, offset]);

  return { activeId, isScrolled };
};
