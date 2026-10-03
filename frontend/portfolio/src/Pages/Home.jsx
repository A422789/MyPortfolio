import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import HireMeBtn from '../Components/HireMeBtn.jsx';
import Icone from '../Components/Icon.jsx';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useProfile } from '../context/ProfileContext';
import SystemOrbitVisualizer from '../Components/SystemOrbitVisualizer';

const Home = () => {
  const { profile, loading, error, refreshProfile } = useProfile();
  const { ref } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  if (loading) {
    return (
      <section className="min-h-[90vh] bg-black flex items-center justify-center mt-20">
        <LoadingSpinner size="large" />
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="min-h-[90vh] bg-black flex flex-col items-center justify-center mt-20 text-center px-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md">
          <p className="text-red-400 text-lg mb-4">{error || 'Unable to connect to server'}</p>
          <button
            onClick={refreshProfile}
            className="px-6 py-2 bg-[#cea605] text-black font-normal rounded-xl hover:bg-[#f2de8c] transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </section>
    );
  }

  const cvDownloadUrl =
    profile?.cvFile?.url
      ? profile.cvFile.url.replace('/upload/', '/upload/fl_attachment/')
      : 'https://res.cloudinary.com/djwqb3ibk/raw/upload/v1785893747/portfolio/cv/1785893746077-367252348_l74qia.pdf';

  return (
    <motion.section
      ref={ref}
      className="min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-12 mt-16 sm:mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left Column: Headlines, Bio & Actions */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6">
        {/* Availability Badges (Two separate boxes without 'and') */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#725c02]/60 bg-[#cea605]/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cea605] animate-ping" />
            <span className="text-xs font-normal text-[#f2de8c] tracking-wider uppercase">
              Open to hybrid internship (Islamabad)
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#725c02]/60 bg-[#cea605]/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cea605]" />
            <span className="text-xs font-normal text-[#f2de8c] tracking-wider uppercase">
              Remote entry-level roles
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.25]">
          Backend-focused <br />
          <span className="text-[#cea605] font-normal" style={{ textShadow: '0 0 20px rgba(206,166,5,0.25)' }}>
            Full-Stack Developer
          </span>
        </h1>

        {/* Dynamic TypeAnimation */}
        <div className="text-sm sm:text-base font-light text-[#f2de8c] min-h-[1.75rem] tracking-wide">
          <TypeAnimation
            sequence={[
              1000,
              'Node.js • Express • MongoDB • React',
              2000,
              'REST APIs & JWT Session Security',
              2000,
              'Database Modeling to Responsive React UIs',
              2000,
            ]}
            wrapper="span"
            speed={15}
            repeat={Infinity}
          />
        </div>

        {/* Bio Summary */}
        <p className="text-sm sm:text-base text-[#a3a3a3] leading-relaxed max-w-xl font-light">
          Hi, I'm <span className="text-white font-normal">{profile?.name || 'Ahmed Ayyad'}</span>. I build secure MERN systems and take them from data models and authentication to clean, accessible UIs, testing, and deployment.
        </p>

        {/* Location & Certifications Meta */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#b3b3b3] pt-1 font-light">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#cea605]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Islamabad, Pakistan
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#cea605]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            9 Verified Certifications (8 IBM Specialization)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-3">
          <HireMeBtn />
          <a
            href={cvDownloadUrl}
            download="Ahmed-Ayyad-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-transparent
              hover:bg-[#f2de8c]
              text-[#cea605]
              hover:text-black
              font-normal
              text-base
              tracking-wide
              py-3 px-6
              border-2
              border-[#cea605]
              rounded-2xl
              overflow-hidden
              cursor-pointer
              transition-all
              duration-300
              shadow-[0_0_15px_5px_rgba(206,166,5,0.25)]
              hover:shadow-[0_0_25px_10px_rgba(206,166,5,0.5)]
              text-center
              flex items-center justify-center gap-2
            "
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </a>
        </div>

        {/* Social Icons */}
        <div className="pt-2">
          <Icone />
        </div>
      </div>

      {/* Right Column: Interactive 3D System Architecture & Tech Orbit */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center items-center relative"
        initial={{ opacity: 0, scale: 0.9, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
      >
        <SystemOrbitVisualizer />
      </motion.div>
    </motion.section>
  );
};

export default Home;
