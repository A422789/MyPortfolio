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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-modal-scroll bg-[var(--color-surface-1)] border border-[var(--color-border-accent)] rounded-3xl p-6 sm:p-10 shadow-[var(--elevation-3)] z-20 text-[var(--color-text-1)]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2.5 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-3)] hover:text-[var(--color-text-1)] border border-[var(--color-border)] hover:border-[var(--color-border-accent)] transition-all duration-200"
            >
              <XMarkIcon className="w-6 h-6 stroke-2" />
            </button>

            {/* Project Image */}
            {project.image?.url && (
              <div className="w-full h-48 sm:h-80 overflow-hidden rounded-2xl mb-8 border border-[var(--color-border)] bg-[var(--color-surface-2)]">
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
                  <h3 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-1)] mb-2">
                    {project.title}
                  </h3>
                  {project.caseStudy?.role && (
                    <p className="text-lg font-medium text-[var(--color-accent)]">
                      {project.caseStudy.role}
                    </p>
                  )}
                </div>

                {/* Problem Statement */}
                {project.caseStudy?.problem && (
                  <div className="bg-[var(--color-surface-2)] p-5 rounded-xl border border-[var(--color-border)]">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-3)] mb-2">
                      The Challenge
                    </h4>
                    <p className="text-base text-[var(--color-text-2)] leading-relaxed">
                      {project.caseStudy.problem}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-3)] mb-3">
                    Overview
                  </h4>
                  <div className="text-[var(--color-text-2)] text-base leading-relaxed whitespace-pre-line">
                    {project.description}
                  </div>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="flex flex-col gap-6">
                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-3)] mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="skill-tag text-[0.8rem] py-1 px-2">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Backend Highlights */}
                {project.caseStudy?.backendHighlights?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-3)] mb-3 flex items-center gap-2">
                      <InformationCircleIcon className="w-5 h-5 text-[var(--color-accent)]" />
                      Backend Highlights
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {project.caseStudy.backendHighlights.map((hl, idx) => (
                        <li key={idx} className="text-sm text-[var(--color-text-2)] flex items-start gap-2">
                          <span className="text-[var(--color-accent)] mt-0.5">•</span>
                          {hl}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-[var(--color-border)]">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2 py-3"
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
                      className="btn-secondary w-full flex items-center justify-center gap-2 py-3"
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                      Source Code
                    </a>
                  )}
                  
                  {project.liveLink && (
                    <button
                      onClick={() => setShowDemoCreds(!showDemoCreds)}
                      className="text-sm text-[var(--color-text-3)] hover:text-[var(--color-accent)] underline underline-offset-4 text-center mt-2"
                    >
                      Need Demo Access?
                    </button>
                  )}
                  
                  {/* Demo Credentials Popover */}
                  <AnimatePresence>
                    {showDemoCreds && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[var(--color-surface-2)] p-4 rounded-xl border border-[var(--color-border)] mt-2 overflow-hidden text-sm"
                      >
                        <p className="text-[var(--color-text-2)] mb-2">Use these credentials to test the dashboard/features:</p>
                        <div className="flex flex-col gap-1 font-mono text-[var(--color-text-1)]">
                          <span>Email: <span className="text-[var(--color-accent)] select-all">admin@example.com</span></span>
                          <span>Password: <span className="text-[var(--color-accent)] select-all">admin123</span></span>
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
