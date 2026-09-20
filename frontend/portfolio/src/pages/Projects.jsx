import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TiltCard from '../components/common/TiltCard';
import ProjectModal from '../components/sections/ProjectModal';
import SkeletonLoader from '../components/common/SkeletonLoader';
import API from '../api/axios';
import { optimizeCloudinaryUrl } from '../utils/cloudinaryOptimizer';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    let isMounted = true;
    API.get('/projects')
      .then((res) => {
        if (isMounted) {
          setProjects(res.data?.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to fetch projects:', err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedProjects = showMore ? projects : projects.slice(0, 3);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
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
          My Top Projects
        </span>
      </motion.h2>

      {loading ? (
        <SkeletonLoader count={3} />
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{ perspective: '1000px' }}
            >
              <TiltCard>
                {/* Project Thumbnail with WebP/AVIF auto compression */}
                <div
                  className="w-full h-52 overflow-hidden rounded-3xl cursor-pointer group relative"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={optimizeCloudinaryUrl(project.image?.url, { width: 800 })}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-semibold tracking-wider bg-[#cea605]/80 px-4 py-2 rounded-full">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Project Header & Overview */}
                <div className="flex flex-col items-start text-left gap-3 mt-2">
                  <h3
                    className="text-2xl font-bold text-white hover:text-[#cea605] transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>
                  <p className="text-base text-[#b3b3b3] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-start gap-4 mt-auto pt-4">
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button text-sm"
                    >
                      Source Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button text-sm"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      )}

      {projects.length > 3 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="contact-send-button px-8 py-3 text-lg font-semibold cursor-pointer"
          >
            {showMore ? ' < Show Less ' : 'Show More >'}
          </button>
        </div>
      )}

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
