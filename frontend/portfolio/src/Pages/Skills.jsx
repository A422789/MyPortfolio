import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillIcon from '../Components/SkillIcon';
import API from '../api/axios.js';
import LoadingSpinner from '../Components/LoadingSpinner';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fetchSkills = () => {
    setLoading(true);
    setError(null);
    API.get('/skills')
      .then(res => {
        setSkills((res.data.data || []).filter(s => !s.isHidden));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch skills:', err);
        setError('Failed to load skills');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="large" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchSkills}
          className="px-6 py-2 bg-[#cea605] text-black font-semibold rounded-xl hover:bg-[#f2de8c] transition-colors"
        >
          Retry
        </button>
      </section>
    );
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-bold text-center mb-16 logo"
      >
        <span className="text-white" style={{ textShadow: '5px 5px 15px #b49106' }}>
          My Skills
        </span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-[85%] sm:w-[80%] max-w-7xl mx-auto flex flex-wrap justify-center items-start gap-x-8 sm:gap-x-12 gap-y-10"
      >
        {skills.map((skill, index) => (
          <motion.div key={skill._id || index} variants={itemVariants}>
            <SkillIcon 
              icon={<div dangerouslySetInnerHTML={{ __html: skill.iconSvg }} />} 
              name={skill.name} 
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
