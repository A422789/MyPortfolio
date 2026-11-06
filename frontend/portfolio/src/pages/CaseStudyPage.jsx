import Reveal from '../components/ui/Reveal';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseStudiesData, getCaseStudyBySlug } from '../content/caseStudiesData';
import PortfolioImage from '../components/ui/PortfolioImage';
import ActionButton from '../components/ui/ActionButton';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const [copiedField, setCopiedField] = useState(null);

  const study = getCaseStudyBySlug(slug);

  const handleCopy = (text, label) => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!study) {
    return (
      <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="text-sm font-mono uppercase tracking-widest text-[#f2de8c]">
            CASE STUDY NOT FOUND
          </span>
          <h1 className="text-3xl sm:text-4xl font-light text-white">
            We couldn&apos;t find a case study matching <span className="text-[#f2de8c] font-mono">&quot;{slug}&quot;</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <ActionButton variant="solid-gold" to="/projects">
              Browse Projects Archive
            </ActionButton>
            <ActionButton variant="glass" to="/#projects">
              ← Back to Overview
            </ActionButton>
          </div>
        </div>
      </section>
    );
  }

  const currentIndex = caseStudiesData.findIndex((item) => item.slug === study.slug);
  const prevStudy = currentIndex > 0 ? caseStudiesData[currentIndex - 1] : null;
  const nextStudy =
    currentIndex >= 0 && currentIndex < caseStudiesData.length - 1
      ? caseStudiesData[currentIndex + 1]
      : null;

  const hasDualImages = Boolean(study.heroImages?.storefront?.url && study.heroImages?.admin?.url);

  const techGroups = study.techStack
    ? [
        { label: 'Backend & Data', items: study.techStack.backend },
        { label: 'Frontend & UI', items: study.techStack.frontend },
        { label: 'Integrations & Services', items: study.techStack.integrations },
        { label: 'Testing & Infrastructure', items: study.techStack.testingAndDevOps },
      ].filter((group) => group.items && group.items.length > 0)
    : [];

  return (
    <article className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto w-full space-y-14">
        {/* Top Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="flex items-center gap-3">
            <ActionButton variant="glass" to="/projects" className="px-4 py-1.5 rounded-full text-xs">
              ← All Case Studies
            </ActionButton>
            <ActionButton variant="glass" to="/#projects" className="px-4 py-1.5 rounded-full text-xs">
              Home Overview
            </ActionButton>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm font-mono text-[#d4d4d4]">
            <span className="inline-flex items-center rounded-full border border-[#995454]/60 bg-transparent px-3 py-1.5 font-medium text-[#c99a9a]">{study.readTime}</span>
            <span className="text-[#cea605]">·</span>
            <span>{study.timeline}</span>
          </div>
        </div>

        {/* Editorial Article Header */}
        <Reveal as="header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <div className="border-l-2 border-[#cea605] pl-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c]">
              {study.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.18]">
            {study.title}
          </h1>

          <p className="text-base sm:text-xl text-[#d4d4d4] font-light leading-relaxed">
            {study.subtitle}
          </p>

          {/* Editorial Metadata Lines (Role & Context — No Box Clutter) */}
          <div className="border-y border-white/15 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-2 border-[#cea605]/70 pl-4 space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#f2de8c] block">
                Engineering Role & Scope
              </span>
              <p className="text-sm sm:text-base text-white font-light leading-snug">
                {study.role}
              </p>
            </div>

            <div className="border-l-2 border-[#cea605]/70 pl-4 space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#f2de8c] block">
                Project Context
              </span>
              <p className="text-sm sm:text-base text-white font-light leading-snug">
                {study.context}
              </p>
            </div>
          </div>

          {/* Live Deployments & Source Repositories */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {study.links?.storefront?.url && (
              <ActionButton variant="solid-gold" href={study.links.storefront.url} external>
                {study.links.storefront.label} ↗
              </ActionButton>
            )}
            {study.links?.adminDashboard?.url && (
              <ActionButton variant="subtle" href={study.links.adminDashboard.url} external className="px-5 py-2.5 rounded-xl">
                {study.links.adminDashboard.label} ↗
              </ActionButton>
            )}
            {study.links?.backendApi?.url && (
              <ActionButton variant="glass" href={study.links.backendApi.url} external>
                {study.links.backendApi.label} ↗
              </ActionButton>
            )}
            {study.links?.repo?.url && (
              <ActionButton variant="glass" href={study.links.repo.url} external>
                {study.links.repo.label} ↗
              </ActionButton>
            )}
            {study.links?.secondaryRepo?.url && (
              <ActionButton variant="glass" href={study.links.secondaryRepo.url} external>
                {study.links.secondaryRepo.label} ↗
              </ActionButton>
            )}
          </div>

          {/* Demo Sandbox Credentials (Editorial Left-Border Callout) */}
          {study.demoCredentials && (
            <div className="border-l-2 border-[#cea605] bg-white/[0.02] pl-5 pr-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#f2de8c] block">
                  Live Reviewer Sandbox Credentials
                </span>
                <p className="text-xs sm:text-sm text-[#d4d4d4] font-light">
                  {study.demoCredentials.note}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(study.demoCredentials.email, 'email')}
                  className="px-3.5 py-1.5 rounded-lg bg-transparent border border-white/15 hover:border-[#cea605] text-xs sm:text-sm font-mono text-white hover:text-[#f2de8c] transition-colors cursor-pointer"
                >
                  {copiedField === 'email' ? '✓ Copied Email' : `Email: ${study.demoCredentials.email}`}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(study.demoCredentials.password, 'password')}
                  className="px-3.5 py-1.5 rounded-lg bg-transparent border border-white/15 hover:border-[#cea605] text-xs sm:text-sm font-mono text-white hover:text-[#f2de8c] transition-colors cursor-pointer"
                >
                  {copiedField === 'password' ? '✓ Copied Password' : `Password: ${study.demoCredentials.password}`}
                </button>
              </div>
            </div>
          )}
        </Reveal>

        {/* Visual Showcase: Dual Storefront + Admin Figures or Single Hero */}
        {hasDualImages ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="space-y-2.5">
              <div className="h-60 sm:h-68 overflow-hidden rounded-xl border border-white/15 bg-black">
                <PortfolioImage
                  src={study.heroImages.storefront.url}
                  alt={study.heroImages.storefront.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs sm:text-sm font-mono text-[#d4d4d4] border-l-2 border-[#cea605] pl-3 flex items-center justify-between">
                <span>01 · {study.heroImages.storefront.caption}</span>
                {study.links?.storefront?.url && (
                  <a
                    href={study.links.storefront.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f2de8c] hover:underline shrink-0 ml-2"
                  >
                    Live ↗
                  </a>
                )}
              </figcaption>
            </figure>

            <figure className="space-y-2.5">
              <div className="h-60 sm:h-68 overflow-hidden rounded-xl border border-white/15 bg-black">
                <PortfolioImage
                  src={study.heroImages.admin.url}
                  alt={study.heroImages.admin.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs sm:text-sm font-mono text-[#d4d4d4] border-l-2 border-[#cea605] pl-3 flex items-center justify-between">
                <span>02 · {study.heroImages.admin.caption}</span>
                {study.links?.adminDashboard?.url && (
                  <a
                    href={study.links.adminDashboard.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f2de8c] hover:underline shrink-0 ml-2"
                  >
                    Admin ↗
                  </a>
                )}
              </figcaption>
            </figure>
          </div>
        ) : study.heroImages?.storefront?.url ? (
          <figure className="space-y-2.5">
            <div
              className={`${study.heroImages.storefront.fit === 'contain' ? 'h-[min(70vh,640px)] min-h-64' : 'max-h-[440px]'} overflow-hidden rounded-xl border border-white/15 bg-black`}
              style={{ backgroundColor: study.heroImages.storefront.background }}
            >
              <PortfolioImage
                src={study.heroImages.storefront.url}
                alt={study.heroImages.storefront.caption || study.title}
                className={`w-full h-full ${study.heroImages.storefront.fit === 'contain' ? 'object-contain p-3 sm:p-5' : 'object-cover'}`}
              />
            </div>
            {study.heroImages.storefront.caption && (
              <figcaption className="text-xs sm:text-sm font-mono text-[#d4d4d4] border-l-2 border-[#cea605] pl-3">
                {study.heroImages.storefront.caption}
              </figcaption>
            )}
          </figure>
        ) : null}

        {/* Executive Summary */}
        <section className="border-l-2 border-[#cea605] pl-5 sm:pl-6 py-1 space-y-2">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c] block">
            EXECUTIVE SUMMARY
          </span>
          <p className="text-base sm:text-lg text-white font-light leading-[1.8]">
            {study.editorialLead}
          </p>
        </section>

        {/* System Technology Stack (Clean Divided Rows) */}
        {techGroups.length > 0 && (
          <section className="border-t border-white/15 pt-10 space-y-6">
            <div className="border-l-2 border-[#cea605] pl-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c] block">
                TECHNOLOGY STACK & INFRASTRUCTURE
              </span>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {techGroups.map((group) => (
                <div
                  key={group.label}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <span className="text-sm sm:text-base font-normal text-white sm:w-56 shrink-0">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs sm:text-sm px-3 py-1 rounded bg-white/[0.04] text-[#f2de8c] border border-white/10 font-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 1: Problem & Engineering Context */}
        {study.problemAndContext && (
          <section className="border-t border-white/15 pt-10 space-y-5">
            <div className="border-l-2 border-[#cea605] pl-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c] block mb-1">
                PROBLEM & CONTEXT
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                {study.problemAndContext.headline}
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-[17px] text-[#d4d4d4] font-light leading-[1.8]">
              {study.problemAndContext.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Dual-Surface Breakdown (Storefront + Admin Dashboard) */}
        {study.dualSystemBreakdown && (
          <section className="border-t border-white/15 pt-10 space-y-8">
            <div className="space-y-3">
              <div className="border-l-2 border-[#cea605] pl-4">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c] block mb-1">
                  DUAL-SURFACE APPLICATION ARCHITECTURE
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white">
                  {study.dualSystemBreakdown.headline}
                </h2>
              </div>
              <p className="text-base sm:text-[17px] text-[#d4d4d4] font-light leading-[1.8]">
                {study.dualSystemBreakdown.intro}
              </p>
            </div>

            <div className="space-y-8">
              {study.dualSystemBreakdown.surfaces.map((surface) => (
                <div
                  key={surface.name}
                  className="border-l-2 border-[#cea605]/80 pl-5 sm:pl-6 space-y-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-2.5">
                    <h3 className="text-xl sm:text-2xl font-normal text-white">
                      {surface.name}
                    </h3>
                    {surface.url && (
                      <a
                        href={surface.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-mono text-[#f2de8c] hover:text-[#cea605] hover:underline"
                      >
                        Launch Live Interface ↗
                      </a>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {surface.highlights.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-[#d4d4d4] font-light leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#cea605] mt-2.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: System Architecture Tiers */}
        {study.architectureTiers && study.architectureTiers.length > 0 && (
          <section className="border-t border-white/15 pt-10 space-y-6">
            <div className="border-l-2 border-[#cea605] pl-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c] block mb-1">
                SYSTEM TOPOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                3. Layered Architecture Breakdown
              </h2>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {study.architectureTiers.map((tier, idx) => (
                <div key={tier.tier} className="py-5 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-[#f2de8c]">0{idx + 1}.</span>
                    <h3 className="text-lg sm:text-xl font-normal text-white">{tier.tier}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-[#d4d4d4] font-light leading-relaxed pl-8">
                    {tier.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Key Backend & Engineering Decisions (with Trade-Offs) */}
        {study.engineeringDecisions && study.engineeringDecisions.length > 0 && (
          <section className="border-t border-white/15 pt-10 space-y-8">
            <div className="border-l-2 border-[#cea605] pl-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c] block mb-1">
                ARCHITECTURAL DECISIONS & TRADE-OFFS
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                4. Key Backend & Security Decisions
              </h2>
            </div>

            <div className="divide-y divide-white/15">
              {study.engineeringDecisions.map((item, idx) => (
                <div key={item.title} className="py-7 first:pt-2 last:pb-0 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-normal text-white">
                    <span className="font-mono text-[#f2de8c] mr-2.5">0{idx + 1}.</span>
                    {item.title}
                  </h3>

                  <ul className="space-y-3 border-l-2 border-[#cea605]/60 pl-5 sm:pl-6">
                    <li className="text-sm sm:text-base text-[#d4d4d4] font-light leading-relaxed">
                      <strong className="font-normal text-white">Implementation: </strong>
                      {item.decision}
                    </li>
                    <li className="text-sm sm:text-base text-[#d4d4d4] font-light leading-relaxed">
                      <strong className="font-normal text-white">Why It Matters: </strong>
                      {item.rationale}
                    </li>
                    <li className="text-sm sm:text-base text-[#d4d4d4] font-light leading-relaxed">
                      <strong className="font-normal text-[#f2de8c]">Engineering Trade-Off: </strong>
                      {item.tradeOff}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Testing & Verification */}
        {study.testingAndVerification && (
          <section className="border-t border-white/15 pt-10 space-y-6">
            <div className="space-y-3">
              <div className="border-l-2 border-[#cea605] pl-4">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c] block mb-1">
                  QUALITY ASSURANCE & VERIFICATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white">
                  {study.testingAndVerification.headline}
                </h2>
              </div>
              <p className="text-base sm:text-[17px] text-[#d4d4d4] font-light leading-[1.8]">
                {study.testingAndVerification.intro}
              </p>
            </div>

            <ul className="space-y-4 border-l-2 border-[#cea605]/70 pl-5 sm:pl-6">
              {study.testingAndVerification.layers.map((layer) => (
                <li
                  key={layer.layer}
                  className="text-sm sm:text-base text-[#d4d4d4] font-light leading-relaxed"
                >
                  <strong className="font-normal text-white block sm:inline">
                    {layer.layer}:{' '}
                  </strong>
                  <span>{layer.details}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section 6: Production Post-Mortem & Lessons Learned */}
        {study.productionPostMortem && (
          <section className="border-t border-white/15 pt-10 space-y-5">
            <div className="border-l-2 border-[#cea605] pl-4">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#f2de8c] block mb-1">
                PRODUCTION POST-MORTEM & TAKEAWAY
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                {study.productionPostMortem.headline}: {study.productionPostMortem.incidentTitle}
              </h2>
            </div>

            <div className="border-l-2 border-[#cea605]/60 pl-5 sm:pl-6 space-y-4 text-sm sm:text-base text-[#d4d4d4] font-light leading-[1.8]">
              <p>
                <strong className="font-normal text-white">What Happened in Production: </strong>
                {study.productionPostMortem.whatHappened}
              </p>
              <p>
                <strong className="font-normal text-[#f2de8c]">Engineering Resolution & Lesson: </strong>
                {study.productionPostMortem.resolutionAndLesson}
              </p>
            </div>
          </section>
        )}

        {/* Bottom Case Study Switcher & Archive Navigation */}
        <footer className="pt-10 border-t border-white/15 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevStudy ? (
              <Link
                to={`/work/${prevStudy.slug}`}
                className="border-l-2 border-white/20 hover:border-[#cea605] pl-4 py-1 transition-all group"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-[#a3a3a3] group-hover:text-[#f2de8c] block mb-1">
                  ← Previous Case Study
                </span>
                <p className="text-base sm:text-lg text-white group-hover:text-[#f2de8c] transition-colors font-light line-clamp-1">
                  {prevStudy.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {nextStudy ? (
              <Link
                to={`/work/${nextStudy.slug}`}
                className="border-r-2 border-white/20 hover:border-[#cea605] pr-4 py-1 transition-all group text-right"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-[#a3a3a3] group-hover:text-[#f2de8c] block mb-1">
                  Next Case Study →
                </span>
                <p className="text-base sm:text-lg text-white group-hover:text-[#f2de8c] transition-colors font-light line-clamp-1">
                  {nextStudy.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <ActionButton variant="subtle" to="/projects" className="px-7 py-3 rounded-full text-sm">
              Explore Complete Projects Archive →
            </ActionButton>
            <ActionButton variant="glass" to="/#projects" className="px-6 py-3 rounded-full text-sm">
              ← Back to Landing Page
            </ActionButton>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default CaseStudyPage;
