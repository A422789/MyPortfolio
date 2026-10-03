import React from 'react';
import { useProfile } from '../context/ProfileContext';

const Footer = () => {
  const { profile } = useProfile();

  return (
    <footer className="h-20 w-full overflow-x-hidden text-white flex items-center justify-center hover:text-amber-300 shadow-amber-300 shadow-2xl">
      <p>{profile?.footerText || `© ${new Date().getFullYear()} Ahmad Ayyad | All Rights Reserved`}</p>
    </footer>
  );
};

export default Footer;
