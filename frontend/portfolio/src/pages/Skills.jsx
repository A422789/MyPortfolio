import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillIcon from '../components/sections/SkillIcon';
import SkeletonLoader from '../components/common/SkeletonLoader';
import API from '../api/axios';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    let isMounted = true;
    API.get('/skills')
      .then((res) => {
        if (isMounted) {
          setSkills(res.data?.data?.filter((s) => !s.isHidden) || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to fetch skills:', err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
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
          My Skills
        </span>
      </motion.h2>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-full max-w-6xl mx-auto flex flex-wrap justify-center items-start gap-x-8 sm:gap-x-12 gap-y-10"
        >
          {skills.map((skill, index) => (
            <motion.div key={skill._id || index} variants={itemVariants}>
              <SkillIcon icon={skill.iconSvg} name={skill.name} delay={index} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Skills;
