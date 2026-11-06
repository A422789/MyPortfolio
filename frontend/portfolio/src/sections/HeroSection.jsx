import Reveal from '../components/ui/Reveal';
import { TypeAnimation } from 'react-type-animation';
import HireMeButton from '../components/ui/HireMeButton';
import CvPreviewButton from '../components/ui/CvPreviewButton';
import SocialIcons from '../components/ui/SocialIcons';
import SystemOrbitVisualizer from '../components/ui/SystemOrbitVisualizer';

const HeroSection = () => {
  return (
    <Reveal as="section"
      className="min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-12 mt-16 sm:mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full lg:w-1/2 flex flex-col space-y-6">
        {/* Availability Badges */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#725c02]/60 bg-[#cea605]/10 w-fit whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cea605] animate-ping shrink-0" />
            <span className="text-[11px] font-normal text-[#f2de8c] tracking-wide uppercase">
              Open to Hybrid Internships (Islamabad)
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#725c02]/60 bg-[#cea605]/10 w-fit whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cea605] shrink-0" />
            <span className="text-[11px] font-normal text-[#f2de8c] tracking-wide uppercase">
              Remote Entry-Level Roles Worldwide
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.25]">
          Backend-Focused <br />
          <span className="text-[#cea605] font-normal" style={{ textShadow: '0 0 20px rgba(206,166,5,0.25)' }}>
            Full-Stack Developer
          </span>
        </h1>

        {/* Sub-Headline TypeAnimation */}
        <div className="text-sm sm:text-base font-light text-[#f2de8c] min-h-[1.75rem] tracking-wide">
          <TypeAnimation
            sequence={[
              1000,
              'Systems-Oriented Engineer · Node.js · Express.js · MongoDB · React.js',
              2200,
              'RESTful API Design · JWT Authentication · Role-Based Access Control',
              2200,
              'Data Modeling to Responsive React UIs, Testing & Cloud Deployment',
              2200,
            ]}
            wrapper="span"
            speed={15}
            repeat={Infinity}
          />
        </div>

        {/* Core Positioning Statement (Without repeating Ahmed Ayyad) */}
        <p className="text-sm sm:text-base text-[#a3a3a3] leading-relaxed max-w-xl font-light">
          Building complete web products from the backend up — taking systems from data modeling, REST APIs, and JWT authentication to responsive React interfaces, automated testing, and cloud deployment.
        </p>

        {/* 3-Item Quick Proof Bar */}
        <div className="flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs text-[#b3b3b3] pt-1 font-light">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#cea605] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Islamabad, Pakistan
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#cea605] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Full-Stack Intern @ CodeAlpha
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#cea605] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            IBM Full-Stack JS Certified (12 Courses)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-3">
          <HireMeButton />
          <CvPreviewButton />
        </div>

        {/* Social Icons */}
        <div className="pt-2">
          <SocialIcons />
        </div>
      </div>

      {/* Right Column: System Orbit Visualizer */}
      <Reveal as="div"
        className="w-full lg:w-1/2 flex justify-center items-center relative"
        initial={{ opacity: 0, scale: 0.9, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
      >
        <SystemOrbitVisualizer />
      </Reveal>
    </Reveal>
  );
};

export default HeroSection;
