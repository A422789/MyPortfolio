import PortfolioImage from '../ui/PortfolioImage';

const CertificateCard = ({ image, title, issuer, completionDate, skills = [], verifyLink, description, reserveEmptyPreview = false }) => {
  return (
    <div
      className="w-full bg-white/[0.03] rounded-3xl border border-[#725c02]/40 hover:border-[#cea605] backdrop-blur-2xl p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg shadow-black/60 hover:shadow-[0_0_35px_rgba(206,166,5,0.25)] h-full"
    >
      <div>
        <div className="w-full h-52 overflow-hidden rounded-2xl bg-black/60 border border-white/5 mb-5 relative flex items-center justify-center">
          {issuer && (
            <span className="absolute top-3 right-3 z-10 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#cea605]/40 text-[#f2de8c]">
              {issuer}
            </span>
          )}

          {image ? (
            <PortfolioImage
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : reserveEmptyPreview ? (
            <div className="w-full h-full" aria-label="Certificate preview reserved" />
          ) : (
            <div className="text-xs text-[#808080]">Document Preview</div>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-normal text-white group-hover:text-[#f2de8c] transition-colors mb-2">
          {title}
        </h3>

        {description && <p className="text-base text-[#d4d4d4] leading-relaxed mb-4">{description}</p>}

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
        {/* Keep pending verification actions visible when a card reserves a document slot. */}
        {verifyLink || reserveEmptyPreview ? (
          <a
            href={verifyLink || undefined}
            role="link"
            tabIndex={0}
            aria-disabled={!verifyLink}
            title={!verifyLink ? 'Verification link pending' : undefined}
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
