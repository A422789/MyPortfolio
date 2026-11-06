import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import { profileData } from '../../content/profileData';
import { socialLinksData } from '../../content/socialLinksData';

const whatsapp = socialLinksData.find((link) => link._id === 'whatsapp');

const FloatingWhatsApp = () => {
  const { pathname, key: locationKey } = useLocation();
  const [heroVisibility, setHeroVisibility] = useState({ locationKey: null, isVisible: true });
  const { profile } = useProfile();
  const phone = (profile?.phone || profileData.phone).replace(/\D/g, '');

  useEffect(() => {
    if (pathname !== '/') return;
    const hero = document.getElementById('home');
    if (!hero) return;

    let isActive = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (!isActive) return;
      const isVisible = entry.isIntersecting;
      setHeroVisibility((previous) => (
        previous.locationKey === locationKey && previous.isVisible === isVisible
          ? previous
          : { locationKey, isVisible }
      ));
    }, { rootMargin: '-80px 0px 0px 0px', threshold: 0 });
    observer.observe(hero);

    return () => {
      isActive = false;
      observer.disconnect();
    };
  }, [pathname, locationKey]);

  if (pathname === '/' && (heroVisibility.locationKey !== locationKey || heroVisibility.isVisible)) return null;

  return (
    <div className="fixed top-20 -left-10 z-40 max-w-md hidden lg:block">
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="p-5 w-30 justify-end flex rounded-full border border-[#cea605]/40 bg-black/70 backdrop-blur-lg shadow-lg shadow-[#25D366]/15 hover:border-[#cea605] hover:shadow-[0_0_24px_rgba(37,211,102,0.35)] transition-[border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] motion-reduce:transition-none"
      >
        <span aria-hidden="true" className="block size-7 text-[#25D366] [&>svg]:size-full [&>svg]:fill-current" dangerouslySetInnerHTML={{ __html: whatsapp.iconSvg }} />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
