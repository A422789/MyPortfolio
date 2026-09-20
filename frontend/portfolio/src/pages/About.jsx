import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { usePortfolio } from '../hooks/usePortfolio';
import { optimizeCloudinaryUrl } from '../utils/cloudinaryOptimizer';

const About = () => {
  const { profile, loading } = usePortfolio();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' },
    },
  };

  if (loading || !profile) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="large" />
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl w-full">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-bold text-center mb-16 logo"
        >
          <span
            className="text-white"
            style={{ textShadow: '0 0 20px rgba(180, 145, 6, 0.6)' }}
          >
            About Me
          </span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* About Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="w-64 h-64 sm:w-80 sm:h-80 lg:order-1 order-2 shrink-0"
          >
            <div className="w-full h-full rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_80px_20px_rgba(206,166,5,0.4)] border-2 border-[#cea605]/30">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={optimizeCloudinaryUrl(profile.aboutImage?.url, { width: 600 })}
                  alt={`${profile.name} About`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* About Bio Text */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:w-1/2 text-lg lg:order-2 order-1"
          >
            <div className="text-[#b3b3b3] leading-relaxed text-center lg:text-left text-lg sm:text-xl font-light whitespace-pre-line">
              {profile.aboutText}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
