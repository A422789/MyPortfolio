import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import TiltCard from '../components/common/TiltCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import API from '../api/axios';
import { optimizeCloudinaryUrl } from '../utils/cloudinaryOptimizer';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CertificateCard = ({ image, title, issuer, completionDate, liveLink }) => {
  const isPdf = typeof image === 'string' && (image.toLowerCase().endsWith('.pdf') || image.includes('/raw/'));

  return (
    <TiltCard>
      <div className="w-full h-52 overflow-hidden rounded-3xl bg-black/40 flex items-center justify-center border border-white/10">
        {isPdf ? (
          <Document file={image} loading={<div className="text-sm text-gray-400">Loading PDF...</div>}>
            <Page pageNumber={1} width={280} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
        ) : (
          <img
            src={optimizeCloudinaryUrl(image, { width: 800 })}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col items-start text-left gap-2 mt-2">
        <h3 className="text-xl font-bold text-white line-clamp-1">{title}</h3>
        <p className="text-sm text-[#cea605] font-medium tracking-wide">
          {issuer || 'Professional Certification'}
        </p>
        {completionDate && (
          <p className="text-xs text-[#8c8c8c]">Issued: {completionDate}</p>
        )}
      </div>

      <div className="flex items-center justify-start gap-4 mt-auto pt-4">
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-button text-xs font-semibold py-2 px-6 rounded-full"
          >
            Verify Credential →
          </a>
        )}
      </div>
    </TiltCard>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [showMore, setShowMore] = useState(false);
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

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedCerts = showMore ? certificates : certificates.slice(0, 3);
  const hiddenCount = Math.max(0, certificates.length - 3);

  const handleToggleShowMore = () => {
    if (showMore) {
      setShowMore(false);
      if (sectionRef.current) {
        const yOffset = -80;
        const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      setShowMore(true);
    }
  };

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        ref(el);
      }}
      className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-[var(--duration-color)]"
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
          Certificates & Credentials
        </span>
      </motion.h2>

      {loading ? (
        <SkeletonLoader count={3} />
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {displayedCerts.map((cert, index) => (
            <motion.div
              key={cert._id || index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{ perspective: '1000px' }}
            >
              <CertificateCard
                image={cert.certificateFile?.url}
                title={cert.title}
                issuer={cert.issuer}
                completionDate={cert.completionDate}
                liveLink={cert.verifyLink}
              />
            </motion.div>
          ))}
        </div>
      )}

      {certificates.length > 3 && (
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
              {showMore ? 'View Featured Only' : `View All Certificates (${hiddenCount})`}
            </span>
            {showMore ? (
              <ChevronUpIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
            )}
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Certificates;
