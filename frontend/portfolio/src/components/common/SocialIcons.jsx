import React from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';

const SocialIcons = ({ className = '' }) => {
  const { socialLinks } = usePortfolio();

  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className={`flex items-center gap-4 sm:gap-6 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link._id || link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${link.platform} profile`}
          className="p-4 sm:p-5 w-fit rounded-full backdrop-blur-lg border border-[#cea605]/30 bg-gradient-to-tr from-black/60 to-black/40 shadow-lg shadow-[#cea605]/30 hover:shadow-2xl hover:shadow-[#f2de8c]/40 hover:scale-110 hover:rotate-2 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:border-[#f2de8c]/70 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f2de8c]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <div className="relative z-10">
            <div
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#cea605] group-hover:text-[#f2de8c] transition-colors duration-300 [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-current [&_path]:fill-current"
              dangerouslySetInnerHTML={{ __html: link.iconSvg }}
            />
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
