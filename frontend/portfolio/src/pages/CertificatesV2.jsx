import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDownIcon, ChevronUpIcon, AcademicCapIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import SkeletonLoader from '../components/common/SkeletonLoader';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';

/**
 * Normalizes IBM certificate names and groups courses.
 * E.g., if issuer is IBM and name contains "Course X", it groups under IBM Professional Certificate.
 * As a fallback, we just group by Issuer or display as list.
 */
function groupCertificates(certs) {
  const groups = {};
  const singles = [];

  certs.forEach(cert => {
    // Basic heuristics to group IBM or other major certs
    if (cert.issuer?.includes('IBM') || cert.title?.includes('IBM')) {
      const groupName = 'IBM Full-Stack Software Developer Professional Certificate';
      if (!groups[groupName]) {
        groups[groupName] = { issuer: 'IBM', courses: [], verifyLink: cert.verifyLink, date: cert.completionDate };
      }
      groups[groupName].courses.push(cert);
    } else {
      singles.push(cert);
    }
  });

  return { groups, singles };
}

const CertificateGroup = ({ title, group }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { version } = useTheme();

  return (
    <div className="bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-2xl p-6 shadow-[var(--glow-sm,var(--elevation-1))] mb-6 transition-all duration-[var(--duration-color)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center shrink-0">
            <AcademicCapIcon className="w-6 h-6 text-[var(--color-accent)]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text-1)]">{title}</h3>
            <p className="text-[var(--color-text-2)] font-medium mt-1">{group.issuer}</p>
            {group.date && <p className="text-xs text-[var(--color-text-3)] mt-1">Completed: {group.date}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {group.verifyLink && (
            <a
              href={group.verifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2 text-sm flex-1 sm:flex-none text-center flex items-center justify-center gap-2"
            >
              Verify <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      
      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
        >
          {isOpen ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
          {isOpen ? 'Hide Courses' : `View ${group.courses.length} Courses`}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-3 overflow-hidden"
            >
              {group.courses.map((course, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 rounded-lg bg-[var(--color-surface-2)]">
                  <span className="text-[var(--color-text-1)] font-medium text-sm">
                    {course.title}
                  </span>
                  {course.verifyLink && (
                    <a href={course.verifyLink} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-accent)] hover:underline shrink-0">
                      Verify Course
                    </a>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SingleCertificate = ({ cert }) => {
  return (
    <div className="bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-2xl p-6 shadow-[var(--glow-sm,var(--elevation-1))] mb-6 transition-all duration-[var(--duration-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center shrink-0">
          <AcademicCapIcon className="w-6 h-6 text-[var(--color-accent)]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[var(--color-text-1)]">{cert.title}</h3>
          <p className="text-[var(--color-text-2)] font-medium mt-1">{cert.issuer}</p>
          {cert.completionDate && <p className="text-xs text-[var(--color-text-3)] mt-1">Issued: {cert.completionDate}</p>}
        </div>
      </div>
      {cert.verifyLink && (
        <a
          href={cert.verifyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary py-2 text-sm flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
        >
          Verify <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    let isMounted = true;
    API.get('/certificates')
      .then((res) => {
        if (isMounted) {
          setCertificates(res.data?.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Failed to fetch certificates:', err);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  const { groups, singles } = groupCertificates(certificates);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        ref(el);
      }}
      id="certificates"
      className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-colors duration-[var(--duration-color)]"
    >
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl font-bold text-center mb-16 section-heading"
      >
        Education & Credentials
      </motion.h2>

      {loading ? (
        <div className="w-full">
          <SkeletonLoader count={3} />
        </div>
      ) : (
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Render Grouped Certs (like IBM Professional) */}
            {Object.entries(groups).map(([title, group], idx) => (
              <CertificateGroup key={`group-${idx}`} title={title} group={group} />
            ))}

            {/* Render Single Certs */}
            {singles.map((cert, idx) => (
              <SingleCertificate key={cert._id || idx} cert={cert} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
