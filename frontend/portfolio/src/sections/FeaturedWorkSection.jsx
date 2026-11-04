import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projectsData } from '../content/projectsData';
import ProjectCard from '../components/cards/ProjectCard';
import ActionButton from '../components/ui/ActionButton';

const FeaturedWorkSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const featuredProjects = projectsData.filter((project) => project.featured).slice(0, 3);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
      id="projects"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
            FLAGSHIP ENGINEERING CASE STUDIES
          </span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2"
          >
            Selected Full-Stack Systems
          </motion.h2>
          <p className="text-sm text-[#a3a3a3] font-light mt-2 max-w-2xl mx-auto">
            Full-stack web systems engineered from the backend up — uniting customer storefronts, executive Admin CMS dashboards, RESTful APIs, authentication security, automated testing, and cloud deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <ActionButton
            variant="subtle"
            to="/projects"
            className="gap-2.5 px-7 py-3 rounded-full text-sm"
          >
            <span>Explore All Projects & Engineering Archive</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </ActionButton>
          <span className="text-xs font-mono text-[#808080]">
            Full-Stack & Cloud Systems · Academic CS (DSA & OOP) · Frontend Applications
          </span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
