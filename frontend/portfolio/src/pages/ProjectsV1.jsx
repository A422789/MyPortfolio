import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import TiltCard from '../components/common/TiltCard';
import ProjectModal from '../components/sections/ProjectModal';
import SkeletonLoader from '../components/common/SkeletonLoader';
import API from '../api/axios';
import { optimizeCloudinaryUrl } from '../utils/cloudinaryOptimizer';

const INITIAL_PROJECTS_COUNT = 3;

// Frontend-only fallback data for Case Studies
const CASE_STUDY_CONFIG = {
  'HE Skincare E-Commerce & Headless CMS': {
    featured: true,
    problem: 'Needed a scalable, SEO-friendly e-commerce platform with a decoupled CMS.',
    role: 'Full-Stack Developer (Backend Focus)',
    backendHighlights: ['Stripe payments', 'Custom RBAC', 'GraphQL API', 'Redis caching'],
  },
  'Collaborative Project Management Tool': {
    featured: true,
    problem: 'Teams required real-time task sync and nested sub-tasks with strict permissions.',
    role: 'Backend Engineer',
    backendHighlights: ['WebSockets', 'PostgreSQL Schema', 'JWT Auth'],
  },
  'HE Skincare Admin Dashboard/CMS': {
    featured: true,
    problem: 'Store owners needed a secure, fast dashboard to manage inventory and view analytics.',
    role: 'Full-Stack Developer',
    backendHighlights: ['Complex Aggregation Pipelines', 'Role-based API Access'],
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const sectionRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    let isMounted = true;
    API.get('/projects')
      .then((res) => {
        if (isMounted) {
          let data = res.data?.data || [];
          data.forEach(p => {
            p.caseStudy = CASE_STUDY_CONFIG[p.title] || {};
          });
          data.sort((a, b) => {
            if (a.caseStudy.featured && !b.caseStudy.featured) return -1;
            if (!a.caseStudy.featured && b.caseStudy.featured) return 1;
            return 0;
          });
          setProjects(data);
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

  const handleToggleShowMore = () => {
    if (showMore) {
      setShowMore(false);
      if (sectionRef.current) {
        const yOffset = -80;
        const element = sectionRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      setShowMore(true);
    }
  };

  const displayedProjects = showMore ? projects : projects.slice(0, INITIAL_PROJECTS_COUNT);
  const hiddenProjectsCount = Math.max(0, projects.length - INITIAL_PROJECTS_COUNT);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        ref(el);
      }}
      id="projects"
      className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-[var(--duration-color)]"
    >
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl font-bold text-center mb-16 logo"
      >
        <span
          className="text-[var(--color-text-1)]"
          style={{ textShadow: 'var(--text-shadow-heading)' }}
        >
          My Top Projects
        </span>
      </motion.h2>

      {loading ? (
        <SkeletonLoader count={3} />
      ) : (
        <motion.div
          layout
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index >= INITIAL_PROJECTS_COUNT ? (index - INITIAL_PROJECTS_COUNT) * 0.08 : index * 0.1 }}
                style={{ perspective: '1000px' }}
              >
                <TiltCard>
                  {/* Card Container styled for V1 */}
                  <div className="flex flex-col h-full bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-[var(--glow-card)] transition-all duration-[var(--duration-color)] group relative">
                    
                    {/* Project Thumbnail */}
                    <div
                      className="w-full h-48 overflow-hidden cursor-pointer relative shrink-0"
                      onClick={() => setSelectedProject(project)}
                    >
                      <img
                        src={optimizeCloudinaryUrl(project.image?.url, { width: 800 })}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <span className="text-sm font-semibold tracking-wider bg-[var(--color-accent)] text-[var(--color-accent-fg)] px-5 py-2.5 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-6 text-left">
                      <h3
                        className="text-xl font-bold text-[var(--color-text-1)] mb-2 hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        {project.title}
                      </h3>
                      
                      {project.caseStudy?.role && (
                        <p className="text-sm font-semibold text-[var(--color-accent)] mb-3">
                          {project.caseStudy.role}
                        </p>
                      )}

                      <p className="text-sm text-[var(--color-text-2)] leading-relaxed line-clamp-3 mb-4 flex-grow">
                        {project.caseStudy?.problem || project.description}
                      </p>

                      {/* Backend Highlights mapped as status chips */}
                      {project.caseStudy?.backendHighlights && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--color-border)]">
                          {project.caseStudy.backendHighlights.slice(0, 3).map((hl, i) => (
                            <span key={i} className="skill-tag text-xs py-1 px-2">
                              {hl}
                            </span>
                          ))}
                          {project.caseStudy.backendHighlights.length > 3 && (
                            <span className="skill-tag text-[var(--color-text-3)] bg-transparent border-transparent text-xs py-1 px-2">
                              +{project.caseStudy.backendHighlights.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Show More */}
      {projects.length > INITIAL_PROJECTS_COUNT && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-12"
        >
          <button
            type="button"
            onClick={handleToggleShowMore}
            className="contact-send-button px-8 py-3 flex items-center gap-2 group"
          >
            <span>
            {showMore ? 'View Featured Only' : `View All Projects (${hiddenProjectsCount})`}
            </span>
            {showMore ? (
              <ChevronUpIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
            )}
          </button>
        </motion.div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
