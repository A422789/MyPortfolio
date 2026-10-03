import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import API from '../api/axios.js';
import LoadingSpinner from '../Components/LoadingSpinner';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';
import { certificationsData } from '../content/certifications';

const PdfThumbnail = lazy(() => import('../Components/PdfThumbnail'));

const CertificateCard = ({ image, title, issuer, completionDate, skills = [], verifyLink }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

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

  const isPdf = typeof image === 'string' && (image.toLowerCase().endsWith('.pdf') || image.includes('/raw/'));

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
        {/* Certificate Preview with Overlaid Issuer Badge */}
        <div className="w-full h-52 overflow-hidden rounded-2xl bg-black/60 border border-white/5 mb-5 relative flex items-center justify-center">
          {issuer && (
            <span className="absolute top-3 right-3 z-10 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#cea605]/40 text-[#f2de8c]">
              {issuer}
            </span>
          )}

          {isPdf ? (
            <Suspense fallback={<div className="flex items-center justify-center h-full text-xs text-[#cea605]">Loading Preview...</div>}>
              <PdfThumbnail file={image} />
            </Suspense>
          ) : image ? (
            <img 
              src={optimizeCloudinaryUrl(image, { width: 700 })} 
              alt={title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="text-xs text-[#808080]">Document Preview</div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-normal text-white group-hover:text-[#f2de8c] transition-colors mb-2">
          {title}
        </h3>

        {/* Completion Date */}
        {completionDate && (
          <div className="flex items-center gap-1.5 text-xs text-[#a3a3a3] font-light mb-3">
            <svg className="w-3.5 h-3.5 text-[#cea605]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{completionDate}</span>
          </div>
        )}

        {/* Skills Chips */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#cea605]/10 text-[#f2de8c] border border-[#cea605]/20 font-light"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action: Verify Link */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
        {verifyLink ? (
          <a
            href={verifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-normal text-[#cea605] hover:text-[#f2de8c] transition-colors"
          >
            Verify Official Credential ↗
          </a>
        ) : (
          <span className="text-xs text-[#808080]">Verified Credential</span>
        )}
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState(certificationsData);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    API.get('/certificates')
      .then(res => {
        if (res.data?.data && res.data.data.length > 0) {
          // Drive directly from backend database records, enriching with skill chips if available
          const dynamicCertificates = res.data.data.map((cert) => {
            const meta = certificationsData.find(
              (c) => c.title?.toLowerCase().includes(cert.title?.toLowerCase().slice(0, 10))
            );
            return meta ? { ...meta, ...cert } : cert;
          });
          setCertificates(dynamicCertificates);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch certificates:', err);
        setCertificates(certificationsData);
      });
  }, []);

  return (
    <section ref={ref} className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8" id="certificate">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
            CREDENTIALS & COMPLIANCE
          </span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2"
          >
            Harmonized Professional Certifications
          </motion.h2>
          <p className="text-sm text-[#a3a3a3] font-light mt-2 max-w-xl mx-auto">
            9 verified credentials covering the IBM Full-Stack Specialization and practical software engineering internship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showMore ? certificates : certificates.slice(0, 3)).map((cert, index) => {
            const pdfFile = cert.documentUrl || cert.certificateFile?.url || cert.image;
            const issuer = cert.issuer || (cert.title?.toLowerCase().includes('codealpha') ? 'CodeAlpha' : 'IBM');
            const verify = cert.verifyLink;
            const date = cert.completionDate;
            const skills = cert.skills || [];

            return (
              <motion.div
                key={cert._id || cert.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ perspective: "1000px" }}
                className="h-full"
              >
                <CertificateCard
                  image={pdfFile}
                  title={cert.title}
                  issuer={issuer}
                  completionDate={date}
                  skills={skills}
                  verifyLink={verify}
                />
              </motion.div>
            );
          })}
        </div>

        {certificates.length > 3 && (
          <div className="flex justify-center items-center mt-14 w-full">
            <button
              onClick={() => {
                if (showMore) {
                  document.getElementById('certificate')?.scrollIntoView({ behavior: 'smooth' });
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
              <span>{showMore ? 'Show Less' : 'Show More Certificates'}</span>
              {!showMore && (
                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-[#cea605]/20 text-[#f2de8c] border border-[#cea605]/40">
                  +{certificates.length - 3}
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
    </section>
  );
};

export default Certificates;
