import { Link } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';

const FOOTER_LINKS = [
  { label: 'Overview', to: '/#home' },
  { label: 'Case Studies', to: '/projects' },
  { label: 'Experience', to: '/experience/ibm' },
];

const Footer = () => {
  const { profile } = useProfile();

  return (
    <footer className="min-h-20 w-full overflow-x-hidden text-white flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 shadow-amber-300 shadow-2xl">
      <p className="text-center text-sm">{profile?.footerText || `© ${new Date().getFullYear()} Ahmed Ayyad | All Rights Reserved`}</p>
      <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5">
        {FOOTER_LINKS.map((link) => (
          <Link key={link.to} to={link.to} className="inline-flex min-h-11 items-center text-sm text-[#b3b3b3] hover:text-[#f2de8c] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none">
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;

