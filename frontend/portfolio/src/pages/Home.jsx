import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import HireMeButton from '../components/sections/HireMeButton';
import SocialIcons from '../components/common/SocialIcons';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { usePortfolio } from '../hooks/usePortfolio';
import { optimizeCloudinaryUrl, getDownloadUrl } from '../utils/cloudinaryOptimizer';

// Status chips shown in v2 Hero
const STATUS_CHIPS = [
  { label: 'Open to remote roles · Europe & Gulf',     dot: 'var(--color-success)' },
  { label: 'Available for hybrid internship · Islamabad', dot: 'var(--color-accent)' },
];

const Home = () => {
  const { profile, loading } = usePortfolio();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  if (loading || !profile) {
    return (
      <section style={{ minHeight: '90vh', backgroundColor: 'var(--color-bg)' }} className="flex items-center justify-center mt-20">
        <LoadingSpinner size="large" text="Loading Profile..." />
      </section>
    );
  }

  const cvDownloadUrl = profile.cvFile?.url ? getDownloadUrl(profile.cvFile.url) : '#';

  return (
    <motion.section
      ref={ref}
      className="min-h-[90vh] py-12 flex flex-col lg:flex-row items-center justify-between gap-10 mt-16 sm:mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Left Column: Text & CTA */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">

        {/* Status chips */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 flex-wrap">
          {STATUS_CHIPS.map((chip) => (
            <span key={chip.label} className="status-chip">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: chip.dot }}
                aria-hidden="true"
              />
              {chip.label}
            </span>
          ))}
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          <span
            className="block text-2xl sm:text-3xl font-light mb-2"
            style={{ color: 'var(--color-text-2)' }}
          >
            Hello, I am
          </span>
          <span
            style={{
              color: 'var(--color-text-1)',
              textShadow: 'var(--text-shadow-name, none)',
            }}
          >
            {profile.name}
          </span>
        </h1>


        {/* Type animation (hero text) */}
        <div
          className="text-xl sm:text-2xl mb-8 tracking-wider min-h-[60px]"
          style={{ color: 'var(--color-text-2)' }}
        >
          {profile.heroText}{' '}
          {profile.typeAnimationText && (
            <TypeAnimation
              sequence={[1000, profile.typeAnimationText, 2000]}
              style={{ color: 'var(--color-accent)', fontWeight: '600' }}
              wrapper="span"
              speed={20}
              repeat={Infinity}
              className="tracking-wider block sm:inline mt-1 sm:mt-0"
            />
          )}
        </div>

        {/* CTAs */}
        <div className="w-full sm:w-fit flex flex-col sm:flex-row items-center gap-4 mb-10">
          <HireMeButton />
          {profile.cvFile?.url && (
            <a
              href={cvDownloadUrl}
              download={`${profile.name.replace(/\s+/g, '-')}-CV.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV Document"
              className="btn-secondary w-full sm:w-auto text-center text-lg font-semibold tracking-wider py-3 px-8"
            >
              Download CV
            </a>
          )}
        </div>

        {/* Social Icons */}
        <div className="mt-2">
          <SocialIcons />
        </div>
      </div>

      {/* Right Column: Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 flex justify-center items-center"
      >
        {/* v1: glowing ring; v2: clean border */}
        <div
          className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full aspect-square p-6"
          style={{
            boxShadow: 'var(--glow-hero, none)',
            background: 'linear-gradient(to top right, rgba(206,166,5,0.40), transparent, rgba(206,166,5,0.20))',
          }}
        >
          <img
            src={optimizeCloudinaryUrl(profile.heroImage?.url, { width: 800 })}
            alt={`${profile.name} — ${profile.title || 'Developer'}`}
            width={384}
            height={384}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
