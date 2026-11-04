import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { certificationsData } from '../content/certificationsData';
import CertificateCard from '../components/cards/CertificateCard';
import SectionExpandButton from '../components/ui/SectionExpandButton';

const CertificatesSection = () => {
  const [showMore, setShowMore] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const certificates = certificationsData;

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
            transition={{ duration: 0.6, ease: 'easeOut' }}
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

            return (
              <motion.div
                key={cert._id || cert.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <CertificateCard
                  image={pdfFile}
                  title={cert.title}
                  issuer={issuer}
                  completionDate={cert.completionDate}
                  skills={cert.skills || []}
                  verifyLink={cert.verifyLink}
                />
              </motion.div>
            );
          })}
        </div>

        {certificates.length > 3 && (
          <SectionExpandButton
            isExpanded={showMore}
            onToggle={() => setShowMore(!showMore)}
            hiddenCount={certificates.length - 3}
            expandLabel="Show More Certificates"
            collapseLabel="Show Less"
            sectionId="certificate"
          />
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;
