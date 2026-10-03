import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import API from '../api/axios.js';
import LoadingSpinner from '../Components/LoadingSpinner';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

const ProjectCard = ({ project, onOpenCaseStudy }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const image = project.image?.url;
  const title = project.title;
  const overview = project.description;
  const techStack = project.techStack || [];
  const liveLink = project.liveLink;
  const sourceLink = project.repoLink;

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-white/[0.03] rounded-3xl border border-[#725c02]/40 hover:border-[#cea605] backdrop-blur-2xl p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg shadow-black/60 hover:shadow-[0_0_35px_rgba(206,166,5,0.25)] h-full"
    >
      <div>
        {/* زر فيو كيس ستادي فوق كل كادر */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#cea605]/90">
            {techStack[0] || 'Web App'}
          </span>
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#cea605]/15 hover:bg-[#cea605] text-[#f2de8c] hover:text-black border border-[#cea605]/40 text-xs font-normal transition-all duration-300 cursor-pointer shadow-sm"
          >
            <span>View Case Study</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Project Screenshot */}
        <div className="w-full h-52 overflow-hidden rounded-2xl bg-black/60 border border-white/5 mb-5 relative">
          {image ? (
            <img 
              src={optimizeCloudinaryUrl(image, { width: 700 })} 
              alt={title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-[#808080]">
              Project Preview
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-normal text-white group-hover:text-[#f2de8c] transition-colors mb-2">
          {title}
        </h3>

        {/* Overview */}
        <p className="text-xs sm:text-sm text-[#a3a3a3] font-light leading-relaxed line-clamp-3 mb-4">
          {overview}
        </p>

        {/* Tech Stack Chips */}
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-0.5 rounded-md bg-[#cea605]/10 text-[#f2de8c] border border-[#cea605]/20 font-light"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10 mt-auto">
        {liveLink ? (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#cea605]/15 hover:bg-[#cea605] text-[#f2de8c] hover:text-black border border-[#cea605]/40 text-xs font-normal transition-all duration-300"
          >
            Live Demo ↗
          </a>
        ) : <div />}

        {sourceLink && (
          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-light text-[#b3b3b3] hover:text-[#f2de8c] transition-colors"
          >
            Source Code ↗
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fetchProjects = () => {
    setLoading(true);
    setError(null);
    API.get('/projects')
      .then(res => {
        setProjects(res.data?.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
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
          onClick={fetchProjects}
          className="px-6 py-2 bg-[#cea605] text-black font-normal rounded-xl hover:bg-[#f2de8c] transition-colors"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section ref={ref} className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8" id="projects">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
            FEATURED CASE STUDIES
          </span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2"
          >
            Featured Projects & Demos
          </motion.h2>
          <p className="text-sm text-[#a3a3a3] font-light mt-2 max-w-xl mx-auto">
            Full-stack MERN systems engineered with robust architecture, REST APIs, and live deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showMore ? projects : projects.slice(0, 3)).map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ perspective: "1000px" }}
              className="h-full"
            >
              <ProjectCard
                project={project}
                onOpenCaseStudy={(p) => setSelectedProject(p)}
              />
            </motion.div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="flex justify-center items-center mt-14 w-full">
            <button
              onClick={() => {
                if (showMore) {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }
                setShowMore(!showMore);
              }}
              className="
                group inline-flex items-center gap-3 px-8 py-3.5 rounded-full
                bg-white/[0.03] hover:bg-[#cea605]/15
                border border-[#725c02]/50 hover:border-[#cea605]
                text-[#f2de8c] hover:text-white
                text-sm font-normal tracking-wide
                shadow-[0_0_20px_rgba(206,166,5,0.15)] hover:shadow-[0_0_30px_rgba(206,166,5,0.35)]
                transition-all duration-300 ease-out cursor-pointer active:scale-95
              "
            >
              <span>{showMore ? 'Show Less' : 'Show More Projects'}</span>
              {!showMore && (
                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-[#cea605]/20 text-[#f2de8c] border border-[#cea605]/40">
                  +{projects.length - 3}
                </span>
              )}
              <svg
                className={`w-4 h-4 text-[#cea605] transition-transform duration-300 ${
                  showMore ? 'rotate-180' : 'group-hover:translate-y-0.5'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#725c02]/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-[#cea605]/20 text-white hover:text-[#f2de8c] border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              <span className="text-xs font-mono uppercase tracking-widest text-[#cea605] block mb-2">
                PROJECT CASE STUDY
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-white mb-4 pr-10">
                {selectedProject.title}
              </h3>

              {/* Modal Image */}
              {selectedProject.image?.url && (
                <div className="w-full h-64 sm:h-80 overflow-hidden rounded-2xl bg-black border border-white/10 mb-6">
                  <img
                    src={optimizeCloudinaryUrl(selectedProject.image.url, { width: 900 })}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Tech Stack */}
              {selectedProject.techStack && (
                <div className="mb-6">
                  <span className="text-xs font-mono text-[#808080] block mb-2">TECHNOLOGY STACK</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-lg bg-[#cea605]/10 text-[#f2de8c] border border-[#cea605]/25 font-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <span className="text-xs font-mono text-[#808080] block mb-2">OVERVIEW & ARCHITECTURE</span>
                <p className="text-sm sm:text-base text-[#b3b3b3] font-light leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-[#cea605] hover:bg-[#f2de8c] text-black text-sm font-normal transition-colors"
                  >
                    Open Live Deployment ↗
                  </a>
                )}
                {selectedProject.repoLink && (
                  <a
                    href={selectedProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 text-sm font-normal transition-colors"
                  >
                    View Source Code ↗
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
