import { Link } from 'react-router-dom';
import PortfolioImage from '../ui/PortfolioImage';
import ActionButton from '../ui/ActionButton';

const ArchiveProjectCard = ({ project, index = 0 }) => {
  const image = project.image?.url;
  const containsImage = project.image?.fit === 'contain';
  const secondaryImage = project.secondaryImage?.url;
  const title = project.title;
  const overview = project.description;
  const techStack = project.techStack || [];
  const liveLink = project.liveLink;
  const liveLinkLabel = project.liveLinkLabel || 'Live Demo ↗';
  const secondaryLiveLink = project.secondaryLiveLink;
  const secondaryLiveLinkLabel = project.secondaryLiveLinkLabel || 'Admin Panel ↗';
  const sourceLink = project.repoLink;
  const secondarySourceLink = project.secondaryRepoLink;
  const hasCaseStudy = Boolean(project.hasCaseStudy && project.slug);
  const caseStudyUrl = hasCaseStudy ? `/work/${project.slug}` : null;
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div className="w-full bg-white/[0.03] rounded-3xl border border-[#725c02]/40 hover:border-[#cea605] backdrop-blur-2xl p-6 sm:p-8 flex flex-col-reverse lg:flex-row items-stretch justify-between gap-6 lg:gap-10 transition-all duration-300 group shadow-lg shadow-black/60 hover:shadow-[0_0_35px_rgba(206,166,5,0.2)]">
      {/* Left Column: Engineering Details, Tech Stack & Actions */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between space-y-5">
        <div className="space-y-4">
          {/* Top Metadata Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-[#cea605]/15 border border-[#cea605]/40 text-xs font-mono text-[#f2de8c]">
              {formattedIndex}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
              {project.badge || techStack[0] || 'Engineering System'}
            </span>
            {project.featured && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#cea605]/10 border border-[#725c02]/60 text-[10px] font-mono uppercase tracking-wider text-[#f2de8c] ml-auto">
                ★ Featured Flagship
              </span>
            )}
          </div>

          {/* Project Title */}
          {hasCaseStudy ? (
            <Link to={caseStudyUrl} className="block">
              <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-[#f2de8c] transition-colors leading-snug">
                {title}
              </h3>
            </Link>
          ) : (
            <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-[#f2de8c] transition-colors leading-snug">
              {title}
            </h3>
          )}

          {/* Full Architectural Description */}
          <p className="text-sm sm:text-base text-[#b3b3b3] font-light leading-relaxed">
            {overview}
          </p>

          {/* Complete Tech Stack Pills */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md bg-[#cea605]/10 text-[#f2de8c] border border-[#cea605]/20 font-light"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2.5">
            {hasCaseStudy && (
              <ActionButton
                variant="subtle"
                to={caseStudyUrl}
                className="gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-normal"
              >
                <span>Read Case Study</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </ActionButton>
            )}

            {liveLink && (
              <ActionButton
                variant={hasCaseStudy ? 'glass' : 'subtle'}
                href={liveLink}
                external
                ariaLabel={`${liveLinkLabel} for ${title}`}
                className="gap-1.5 px-4 py-2 rounded-xl text-xs"
              >
                {liveLinkLabel}
              </ActionButton>
            )}

            {secondaryLiveLink && (
              <ActionButton
                variant="glass"
                href={secondaryLiveLink}
                external
                ariaLabel={`${secondaryLiveLinkLabel} for ${title}`}
                className="gap-1.5 px-4 py-2 rounded-xl text-xs"
              >
                {secondaryLiveLinkLabel}
              </ActionButton>
            )}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {sourceLink && (
              <a
                href={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source Code for ${title}`}
                className="text-xs font-mono text-[#b3b3b3] hover:text-[#f2de8c] transition-colors"
              >
                {secondarySourceLink ? 'Storefront Repo ↗' : 'Source Code ↗'}
              </a>
            )}
            {secondarySourceLink && (
              <a
                href={secondarySourceLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Admin Source Code for ${title}`}
                className="text-xs font-mono text-[#b3b3b3] hover:text-[#f2de8c] transition-colors"
              >
                Admin Repo ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: High-Resolution Visual Showcase */}
      <div className="w-full lg:w-[42%] shrink-0 flex items-center">
        <div className={`w-full ${containsImage ? 'h-60 sm:h-72 lg:h-80' : 'h-60 sm:h-72 lg:h-full'} min-h-[250px] overflow-hidden rounded-2xl bg-black/80 border border-white/10 relative`} style={{ backgroundColor: project.image?.background }}>
          {image ? (
            <>
              <PortfolioImage
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className={`w-full h-full ${containsImage ? 'object-contain p-3 sm:p-4' : 'object-cover transition-transform duration-500 group-hover:scale-105'}`}
              />

              {/* Dual-Interface Overlapping Secondary Preview (Storefront + Admin CMS) */}
              {secondaryImage && (
                <div className="absolute bottom-3 right-3 w-[48%] h-[46%] rounded-xl overflow-hidden border-2 border-[#cea605]/80 shadow-2xl shadow-black bg-black transition-transform duration-500 group-hover:scale-105">
                  <PortfolioImage
                    src={secondaryImage}
                    alt={`${title} Admin Dashboard`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-black/85 text-[9px] font-mono uppercase tracking-wider text-[#f2de8c] border border-[#cea605]/40">
                    Admin CMS
                  </span>
                </div>
              )}

              {!secondaryImage && secondaryLiveLink && (
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/85 text-[#f2de8c] border border-[#cea605]/40 backdrop-blur-md">
                  Public Portal + Admin CMS
                </span>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#171307] via-[#0a0a0a] to-black relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#cea605]/10 blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cea605]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cea605]/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2de8c]/80">
                  {project.category === 'academic' ? 'CS Architecture' : 'Cloud / Backend System'}
                </span>
              </div>

              <div className="my-auto py-4 space-y-2">
                <p className="text-xs font-mono text-[#cea605] uppercase tracking-wider">
                  // System Architecture Blueprint
                </p>
                <p className="text-base font-normal text-white/90 line-clamp-2">
                  {title}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {techStack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#b3b3b3] border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#808080] pt-3 border-t border-white/5">
                <span>Architecture & Implementation</span>
                <span className="text-[#f2de8c]">Case Study Ready →</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchiveProjectCard;
