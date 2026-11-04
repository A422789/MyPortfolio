import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillCard from '../components/cards/SkillCard';
import { skillsData } from '../content/skillsData';

const TechStackSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <section ref={ref} className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8" id="skills">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
            TECHNICAL PROFICIENCY
          </span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2"
          >
            My Technical Skills
          </motion.h2>
          <p className="text-sm text-[#a3a3a3] font-light mt-2 max-w-xl mx-auto">
            Interactive stack of technologies, frameworks, and tools used across full-stack applications.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-[90%] sm:w-[85%] max-w-7xl mx-auto flex flex-wrap justify-center items-start gap-x-8 sm:gap-x-12 gap-y-10"
        >
          {skillsData.map((skill, index) => (
            <motion.div key={skill._id || index} variants={itemVariants}>
              <SkillCard
                icon={<div dangerouslySetInnerHTML={{ __html: skill.iconSvg }} />}
                name={skill.name}
                delay={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
