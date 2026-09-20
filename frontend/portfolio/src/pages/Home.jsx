import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import HireMeButton from '../components/sections/HireMeButton';
import SocialIcons from '../components/common/SocialIcons';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { usePortfolio } from '../hooks/usePortfolio';
import { optimizeCloudinaryUrl, getDownloadUrl } from '../utils/cloudinaryOptimizer';

const Home = () => {
  const { profile, loading } = usePortfolio();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  if (loading || !profile) {
    return (
      <section className="min-h-[90vh] bg-black flex items-center justify-center mt-20">
        <LoadingSpinner size="large" text="Loading Profile..." />
      </section>
    );
  }

  const cvDownloadUrl = profile.cvFile?.url ? getDownloadUrl(profile.cvFile.url) : '#';

  return (
    <motion.section
      ref={ref}
      className="min-h-[90vh] py-12 bg-black flex flex-col lg:flex-row items-center justify-between gap-10 mt-16 sm:mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Left Column: Text & CTA */}
      <div className="text-white w-full lg:w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          <span className="text-[#b3b3b3] block text-2xl sm:text-3xl font-light mb-2">
            Hello, I am
          </span>
          <span className="text-white" style={{ textShadow: '0 0 25px rgba(206,166,5,0.4)' }}>
            {profile.name}
          </span>
        </h1>

        <div className="text-xl sm:text-3xl mb-8 tracking-wider text-[#b3b3b3] min-h-[70px]">
          {profile.heroText}{' '}
          {profile.typeAnimationText && (
            <TypeAnimation
              sequence={[1000, profile.typeAnimationText, 2000]}
              className="text-[#cea605] font-semibold tracking-wider block sm:inline mt-1 sm:mt-0"
              wrapper="span"
              speed={20}
              repeat={Infinity}
            />
          )}
        </div>

        {/* Buttons */}
        <div className="w-full sm:w-fit flex flex-col sm:flex-row items-center gap-5 sm:gap-6 mb-10">
          <HireMeButton />
          {profile.cvFile?.url && (
            <a
              href={cvDownloadUrl}
              download={`${profile.name.replace(/\s+/g, '-')}-CV.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV Document"
              className="
                w-full sm:w-auto text-center
                bg-transparent
                hover:bg-[#f2de8c]
                text-[#cea605]
                hover:text-black
                font-semibold
                text-xl
                tracking-wider
                py-3 px-8
                border-2
                border-[#cea605]
                rounded-2xl
                cursor-pointer
                transition-all
                duration-300
                shadow-[0_0_15px_7px_rgba(206,166,5,0.3)]
                hover:shadow-[0_0_25px_10px_rgba(206,166,5,0.5)]
              "
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

      {/* Right Column: Hero Image with explicit width/height for zero CLS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full lg:w-1/2 flex justify-center items-center"
      >
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-2 bg-gradient-to-tr from-[#cea605]/40 via-transparent to-[#cea605]/20 shadow-[0_0_80px_20px_rgba(206,166,5,0.25)] aspect-square">
          <img
            src={optimizeCloudinaryUrl(profile.heroImage?.url, { width: 800 })}
            alt={`${profile.name} - ${profile.title || 'Developer'}`}
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
