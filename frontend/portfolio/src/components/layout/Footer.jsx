import React from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';

const Footer = () => {
  const { profile } = usePortfolio();

  return (
    <footer className="h-24 w-full text-white flex flex-col items-center justify-center border-t border-white/10 bg-black/60 backdrop-blur-lg px-4 text-center">
      <p className="text-[#8c8c8c] text-sm sm:text-base tracking-wider font-light">
        {profile?.footerText || `© ${new Date().getFullYear()} Ahmed Ayyad | All Rights Reserved`}
      </p>
    </footer>
  );
};

export default Footer;
