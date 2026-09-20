import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { optimizeCloudinaryUrl } from '../../utils/cloudinaryOptimizer';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#cea605]/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(206,166,5,0.2)] z-10 text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Project Image */}
          {project.image?.url && (
            <div className="w-full h-64 sm:h-80 overflow-hidden rounded-2xl mb-6 border border-white/10">
              <img
                src={optimizeCloudinaryUrl(project.image.url, { width: 1200 })}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Project Header */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {project.title}
          </h3>

          {/* Tech Stack Badges */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-[#cea605]/10 text-[#cea605] border border-[#cea605]/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="text-[#b3b3b3] text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-line">
            {project.description}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-button bg-[#cea605] text-black font-semibold hover:bg-[#f2de8c] transition-all px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(206,166,5,0.4)]"
              >
                Live Demo ↗
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-button border border-[#cea605]/50 hover:border-[#cea605] text-white hover:text-[#cea605] transition-all px-6 py-3 rounded-xl"
              >
                Source Code (GitHub) ↗
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
