import { Link } from 'react-router-dom';
import PortfolioImage from '../ui/PortfolioImage';
import ActionButton from '../ui/ActionButton';

const ProjectCard = ({ project }) => {
  const image = project.image?.url;
  const containsImage = project.image?.fit === 'contain';
  const title = project.title;
  const overview = project.description;
  const techStack = project.techStack || [];
  const liveLink = project.liveLink;
  const liveLinkLabel = project.liveLinkLabel || 'Live Demo ↗';
  const secondaryLiveLink = project.secondaryLiveLink;
  const secondaryLiveLinkLabel = project.secondaryLiveLinkLabel || 'Admin Panel ↗';
  const sourceLink = project.repoLink;
  const hasCaseStudy = Boolean(project.hasCaseStudy && project.slug);
  const caseStudyUrl = hasCaseStudy ? `/work/${project.slug}` : null;

  return (
    <div className="w-full bg-white/[0.03] rounded-3xl border border-[#725c02]/40 hover:border-[#cea605] backdrop-blur-2xl p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg shadow-black/60 hover:shadow-[0_0_35px_rgba(206,166,5,0.2)] h-full">
      <div>
        {/* Top Header Row: Badge + Case Study Link */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#cea605]/90 truncate">
            {project.badge || techStack[0] || 'Engineering Project'}
          </span>

          {hasCaseStudy && (
            <ActionButton
              variant="subtle"
              to={caseStudyUrl}
              className="gap-1.5 px-3.5 py-1 rounded-full shrink-0"
            >
              <span>Read Case Study</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </ActionButton>
          )}
        </div>

        {/* Visual Preview Box */}
        <div className="w-full h-52 overflow-hidden rounded-2xl bg-black/70 border border-white/10 mb-5 relative" style={{ backgroundColor: project.image?.background }}>
          {image ? (
            <PortfolioImage
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className={`w-full h-full ${containsImage ? 'object-contain p-3' : 'object-cover transition-transform duration-500 group-hover:scale-105'}`}
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br from-[#171307] via-[#0a0a0a] to-black relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#cea605]/10 blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#cea605]/80" />
                  <span className="w-2 h-2 rounded-full bg-[#cea605]/40" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2de8c]/80">
                  {project.category === 'academic' ? 'CS Architecture' : 'Cloud / Backend System'}
                </span>
              </div>

              <div className="my-auto py-2">
                <p className="text-xs font-mono text-[#cea605] uppercase tracking-wider mb-1">
                  // System Architecture Blueprint
                </p>
                <p className="text-sm font-normal text-white/90 line-clamp-2">
                  {title}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#808080] pt-2 border-t border-white/5">
                <span>{techStack.slice(0, 3).join(' · ')}</span>
                <span className="text-[#f2de8c]">Verified Repo</span>
              </div>
            </div>
          )}

          {secondaryLiveLink && image && (
            <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/85 text-[#f2de8c] border border-[#cea605]/40 backdrop-blur-md">
              Storefront + Admin CMS
            </span>
          )}
        </div>

        {/* Title */}
        {hasCaseStudy ? (
          <Link to={caseStudyUrl} className="block">
            <h3 className="text-xl font-normal text-white group-hover:text-[#f2de8c] transition-colors mb-2">
              {title}
            </h3>
          </Link>
        ) : (
          <h3 className="text-xl font-normal text-white group-hover:text-[#f2de8c] transition-colors mb-2">
            {title}
          </h3>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#a3a3a3] font-light leading-relaxed line-clamp-3 mb-4">
          {overview}
        </p>

        {/* Tech Stack Pills */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {techStack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-0.5 rounded-md bg-[#cea605]/10 text-[#f2de8c] border border-[#cea605]/20 font-light"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 6 && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-[#a3a3a3] border border-white/10 font-mono">
                +{techStack.length - 6}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Action Links */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-white/10 mt-auto">
        <div className="flex flex-wrap items-center gap-2">
          {liveLink && (
            <ActionButton
              variant="subtle"
              href={liveLink}
              external
              ariaLabel={`${liveLinkLabel} for ${title}`}
              className="gap-1.5 px-3.5 py-1.5 rounded-xl text-xs"
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
              className="gap-1.5 px-3.5 py-1.5 rounded-xl text-xs"
            >
              {secondaryLiveLinkLabel}
            </ActionButton>
          )}
        </div>

        {sourceLink && (
          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Source Code for ${title}`}
            className="text-xs font-light text-[#b3b3b3] hover:text-[#f2de8c] transition-colors ml-auto"
          >
            Source Code ↗
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
