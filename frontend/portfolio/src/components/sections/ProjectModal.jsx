import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CodeBracketIcon, GlobeAltIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { optimizeCloudinaryUrl } from '../../utils/cloudinaryOptimizer';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [showDemoCreds, setShowDemoCreds] = useState(false);

  // Lock body scroll and listen for ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container — V1 Classic Gold Theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-modal-scroll rounded-3xl p-6 sm:p-10 z-20"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #0d0d0d 100%)',
              border: '1px solid rgba(206, 166, 5, 0.3)',
              boxShadow: '0 0 50px rgba(206,166,5,0.2), 0 0 100px rgba(206,166,5,0.08)',
              color: '#ffffff',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2.5 rounded-full transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(206,166,5,0.2)',
                color: '#8c8c8c',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#cea605'; e.currentTarget.style.borderColor = 'rgba(206,166,5,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#8c8c8c'; e.currentTarget.style.borderColor = 'rgba(206,166,5,0.2)'; }}
            >
              <XMarkIcon className="w-6 h-6 stroke-2" />
            </button>

            {/* Project Image */}
            {project.image?.url && (
              <div
                className="w-full h-48 sm:h-80 overflow-hidden rounded-2xl mb-8"
                style={{ border: '1px solid rgba(206,166,5,0.2)' }}
              >
                <img
                  src={optimizeCloudinaryUrl(project.image.url, { width: 1200 })}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div>
                  <h3
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{ color: '#ffffff', textShadow: '0 0 20px rgba(206,166,5,0.3)' }}
                  >
                    {project.title}
                  </h3>
                  {project.caseStudy?.role && (
                    <p className="text-lg font-medium" style={{ color: '#cea605' }}>
                      {project.caseStudy.role}
                    </p>
                  )}
                </div>

                {/* Problem Statement */}
                {project.caseStudy?.problem && (
                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: 'rgba(206,166,5,0.05)',
                      border: '1px solid rgba(206,166,5,0.15)',
                    }}
                  >
                    <h4
                      className="text-sm font-bold uppercase tracking-wider mb-2"
                      style={{ color: '#8c8c8c' }}
                    >
                      The Challenge
                    </h4>
                    <p className="text-base leading-relaxed" style={{ color: '#b3b3b3' }}>
                      {project.caseStudy.problem}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4
                    className="text-sm font-bold uppercase tracking-wider mb-3"
                    style={{ color: '#8c8c8c' }}
                  >
                    Overview
                  </h4>
                  <div className="text-base leading-relaxed whitespace-pre-line" style={{ color: '#b3b3b3' }}>
                    {project.description}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-6">
                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <div>
                    <h4
                      className="text-sm font-bold uppercase tracking-wider mb-3"
                      style={{ color: '#8c8c8c' }}
                    >
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs py-1 px-3 rounded-full font-medium"
                          style={{
                            background: 'rgba(206,166,5,0.10)',
                            border: '1px solid rgba(206,166,5,0.30)',
                            color: '#cea605',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Backend Highlights */}
                {project.caseStudy?.backendHighlights?.length > 0 && (
                  <div>
                    <h4
                      className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                      style={{ color: '#8c8c8c' }}
                    >
                      <InformationCircleIcon className="w-5 h-5" style={{ color: '#cea605' }} />
                      Backend Highlights
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {project.caseStudy.backendHighlights.map((hl, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2" style={{ color: '#b3b3b3' }}>
                          <span style={{ color: '#cea605' }} className="mt-0.5">•</span>
                          {hl}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div
                  className="flex flex-col gap-3 mt-4 pt-6"
                  style={{ borderTop: '1px solid rgba(206,166,5,0.15)' }}
                >
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold tracking-wider transition-all duration-200"
                      style={{
                        background: '#cea605',
                        color: '#000000',
                        boxShadow: '0 0 15px rgba(206,166,5,0.4)',
                      }}
                    >
                      <GlobeAltIcon className="w-5 h-5" />
                      Live Demo
                    </a>
                  )}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold tracking-wider transition-all duration-200"
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(206,166,5,0.5)',
                        color: '#ffffff',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#cea605'; e.currentTarget.style.color = '#cea605'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(206,166,5,0.5)'; e.currentTarget.style.color = '#ffffff'; }}
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                      Source Code
                    </a>
                  )}

                  {project.liveLink && (
                    <button
                      onClick={() => setShowDemoCreds(!showDemoCreds)}
                      className="text-sm underline underline-offset-4 text-center mt-2 transition-colors duration-200"
                      style={{ color: '#8c8c8c' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#cea605'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#8c8c8c'; }}
                    >
                      Need Demo Access?
                    </button>
                  )}

                  {/* Demo Credentials */}
                  <AnimatePresence>
                    {showDemoCreds && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-xl mt-2 overflow-hidden text-sm"
                        style={{
                          background: 'rgba(206,166,5,0.05)',
                          border: '1px solid rgba(206,166,5,0.2)',
                        }}
                      >
                        <p className="mb-2" style={{ color: '#b3b3b3' }}>
                          Use these credentials to test the dashboard/features:
                        </p>
                        <div className="flex flex-col gap-1 font-mono" style={{ color: '#ffffff' }}>
                          <span>Email: <span className="select-all" style={{ color: '#cea605' }}>admin@example.com</span></span>
                          <span>Password: <span className="select-all" style={{ color: '#cea605' }}>admin123</span></span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
