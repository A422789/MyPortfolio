import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useProfile } from '../context/ProfileContext';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';
import LoadingSpinner from '../Components/LoadingSpinner';

const About = () => {
  const { profile, loading } = useProfile();
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  if (loading) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="large" />
      </section>
    );
  }

  const aboutImageUrl =
    profile?.aboutImage?.url ||
    'https://res.cloudinary.com/djwqb3ibk/image/upload/v1783571009/portfolio/profile/AboutSec_bqpihy.png';

  return (
    <section 
      ref={ref}
      id="about"
      className="min-h-screen bg-black flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Narrative & Academic Qualification */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-3/5 space-y-6"
          >
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#725c02]/60 bg-[#cea605]/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#cea605]" />
              <span className="text-xs font-normal text-[#f2de8c] tracking-wider uppercase">
                Islamabad, Pakistan
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              Engineering with <span className="text-[#cea605] font-normal">Backend Discipline</span> & Full-Stack Rigor
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#a3a3a3] font-light leading-relaxed">
              <p>
                I'm a backend-focused full-stack developer building secure MERN applications with Node.js, Express, MongoDB, and React. I work across data modeling, authentication, RBAC, REST APIs, testing, and deployment.
              </p>
              <p>
                My process begins with data models and architectural contracts: structuring MongoDB schemas, designing stateless REST APIs, enforcing session refresh with HTTP-only cookies, and implementing role-based access control (RBAC). Once the backend core is hardened, I craft fast, responsive, and intuitive React interfaces.
              </p>
              <p>
                I'm completing my Software Engineering degree at Riphah International University in Islamabad and looking for a hybrid internship in Islamabad or remote entry-level roles.
              </p>
            </div>

            {/* Academic Qualification Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-[#725c02]/40 hover:border-[#cea605] transition-colors shadow-lg shadow-black/40">
              <span className="text-xs font-mono uppercase tracking-widest text-[#cea605] block mb-1">
                ACADEMIC QUALIFICATION
              </span>
              <h3 className="text-base sm:text-lg font-normal text-white">
                Bachelor of Science in Software Engineering (BSSE)
              </h3>
              <p className="text-xs sm:text-sm text-[#a3a3a3] font-light mt-0.5">
                Riphah International University • Islamabad, Pakistan
              </p>
              <span className="text-xs font-mono text-[#f2de8c] mt-2.5 inline-block px-2.5 py-0.5 rounded bg-[#cea605]/10 border border-[#cea605]/20 font-light">
                Final Year / Graduating 2026
              </span>
            </div>
          </motion.div>

          {/* Right Column: Visual Portrait with Hover Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 flex justify-center items-center relative"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden bg-black/60 border border-[#725c02]/40 hover:border-[#cea605] transition-all duration-500 hover:shadow-[0_0_35px_rgba(206,166,5,0.35)] group">
              <img
                src={optimizeCloudinaryUrl(aboutImageUrl, { width: 700 })}
                alt={`${profile?.name || 'Ahmed Ayyad'} - About`}
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
