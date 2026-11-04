import React, { lazy, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';

const PdfThumbnail = lazy(() => import('../ui/PdfThumbnail'));

const CertificateCard = ({ image, title, issuer, completionDate, skills = [], verifyLink }) => {
  const { ref: cardRef, inView: cardInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const isPdf = typeof image === 'string' && (image.toLowerCase().endsWith('.pdf') || image.includes('/raw/'));

  return (
    <div
      ref={cardRef}
      className="w-full bg-white/[0.03] rounded-3xl border border-[#725c02]/40 hover:border-[#cea605] backdrop-blur-2xl p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg shadow-black/60 hover:shadow-[0_0_35px_rgba(206,166,5,0.25)] h-full"
    >
      <div>
        <div className="w-full h-52 overflow-hidden rounded-2xl bg-black/60 border border-white/5 mb-5 relative flex items-center justify-center">
          {issuer && (
            <span className="absolute top-3 right-3 z-10 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#cea605]/40 text-[#f2de8c]">
              {issuer}
            </span>
          )}

          {isPdf ? (
            cardInView ? (
              <Suspense fallback={<div className="flex items-center justify-center h-full text-xs text-[#cea605]">Loading Preview...</div>}>
                <PdfThumbnail file={image} />
              </Suspense>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-center px-4">
                <div className="w-12 h-12 rounded-2xl bg-[#cea605]/10 border border-[#cea605]/30 flex items-center justify-center text-[#f2de8c]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-mono text-[#a3a3a3]">Official Verified Credential</span>
              </div>
            )
          ) : image ? (
            <img
              src={optimizeCloudinaryUrl(image, { width: 500 })}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-xs text-[#808080]">Document Preview</div>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-normal text-white group-hover:text-[#f2de8c] transition-colors mb-2">
          {title}
        </h3>

        {completionDate && (
          <div className="flex items-center gap-1.5 text-xs text-[#a3a3a3] font-light mb-3">
            <svg className="w-3.5 h-3.5 text-[#cea605]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{completionDate}</span>
          </div>
        )}

        {skills.length > 0 && (
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

      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
        {verifyLink ? (
          <a
            href={verifyLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify official credential for ${title}`}
            className="inline-flex items-center gap-1.5 text-xs font-normal text-[#cea605] hover:text-[#f2de8c] transition-colors"
          >
            Verify Official Credential ↗
          </a>
        ) : (
          <span className="text-xs text-[#808080]">Verified Credential</span>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
