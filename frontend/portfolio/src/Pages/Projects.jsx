import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import API from '../api/axios.js';
import LoadingSpinner from '../Components/LoadingSpinner';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

const ProjectCard = ({ image, title, overview, liveLink, sourceLink }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

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

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d', 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-white/5 rounded-4xl backdrop-blur-3xl p-6 flex flex-col gap-4 transform-gpu will-change-transform"
    >
      <div className="w-full h-48 overflow-hidden rounded-3xl bg-black/40">
        <img 
          src={optimizeCloudinaryUrl(image)} 
          alt={title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="flex flex-col items-start text-left gap-4 flex-1">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-base text-[#b3b3b3] leading-relaxed line-clamp-4">
          {overview}
        </p>
      </div>

      <div className="flex items-center justify-start gap-6 mt-4">
        {sourceLink && (
          <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="project-button">
            Source Code
          </a>
        )}
        {liveLink && (
          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-button">
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
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
        setProjects(res.data.data || []);
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
          className="px-6 py-2 bg-[#cea605] text-black font-semibold rounded-xl hover:bg-[#f2de8c] transition-colors"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section ref={ref} className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 scale-90">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-bold text-center mb-16 logo"
      >
        <span className="text-white" style={{ textShadow: '5px 5px 15px #b49106' }}>
          My Top Projects
        </span>
      </motion.h2>

      <div className="w-[90%] lg:w-[80%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {(showMore ? projects : projects.slice(0, 3)).map((project, index) => (
          <motion.div
            key={project._id || index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={{ perspective: "1000px" }}
          >
            <ProjectCard
              image={project.image?.url}
              title={project.title}
              overview={project.description}
              liveLink={project.liveLink}
              sourceLink={project.repoLink}
            />
          </motion.div>
        ))}
      </div>

      {projects.length > 3 && (
        <div className="flex justify-end max-h-20 mt-10 w-[90%] lg:w-[80%] max-w-7xl mx-auto">
          <button
            onClick={() => setShowMore(!showMore)}
            className="contact-send-button"
          >
            {showMore ? " < Show Less " : "Show More >"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
