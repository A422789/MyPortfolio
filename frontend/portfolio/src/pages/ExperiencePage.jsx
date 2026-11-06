import Reveal from '../components/ui/Reveal';
import { Link, useParams } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import CertificateCard from '../components/cards/CertificateCard';
import { experienceData } from '../content/experienceData';
import CredentialPreview, { credentialActionClass } from '../components/ui/CredentialPreview';

const textLinkClass = 'inline-flex min-h-11 items-center gap-2 text-[#f2de8c] underline underline-offset-4 decoration-[#cea605]/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c]';

const ExperiencePage = () => {
  const { slug } = useParams();
  const reducedMotion = useReducedMotion();
  const experience = experienceData.find((item) => item.slug === slug);


  return (
    <article className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-white/15 pb-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base">
            <li><Link to="/#home" className={textLinkClass}>Overview</Link></li>
            <li aria-hidden="true" className="text-[#cea605]">/</li>
            <li><Link to="/#experience" className={textLinkClass}>Experience</Link></li>
            <li aria-hidden="true" className="text-[#cea605]">/</li>
            <li aria-current="page" className="py-3 text-[#d4d4d4] break-words min-w-0">{experience?.organization ?? 'Not found'}</li>
          </ol>
        </nav>
          <nav aria-label="Experience pages" className="flex flex-wrap items-center gap-2.5">
            <Link to="/#experience" className="inline-flex min-h-11 items-center px-4 py-2 rounded-full text-xs font-mono tracking-wider bg-transparent text-[#b3b3b3] border border-white/10 hover:text-[#f2de8c] hover:border-[#cea605]/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c]">
              All experiences ({experienceData.length})
            </Link>
            {experienceData.map((item) => (
              <Link
                key={item.slug}
                to={`/experience/${item.slug}`}
                aria-current={slug === item.slug ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] ${slug === item.slug
                  ? 'bg-[#cea605] text-black font-medium shadow-[0_0_20px_rgba(206,166,5,0.4)]'
                  : 'bg-transparent text-[#b3b3b3] border border-white/10 hover:text-[#f2de8c] hover:border-[#cea605]/40'}`}
              >
                {item.slug === 'riphah' ? 'Riphah' : item.organization}
              </Link>
            ))}
          </nav>
        </div>

        {experience ? (
          <>

            <Reveal as="header" key={slug} initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className={`py-10 sm:py-14 grid gap-10 items-start ${experience.primaryDocument ? 'lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14' : ''}`}>
              <div className="space-y-6 min-w-0">
                <p className="border-l-2 border-[#cea605] pl-4 text-sm font-mono uppercase tracking-widest text-[#f2de8c]">{experience.category}</p>
                <h1 className="text-3xl sm:text-5xl font-light tracking-tight leading-[1.18]">{experience.organization}</h1>
                <p className="text-xl sm:text-2xl font-light leading-relaxed">{experience.title}</p>
                <p className="text-base sm:text-lg text-[#d4d4d4] leading-relaxed max-w-prose">{experience.summary}</p>
                <dl className="border-y border-white/15 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {experience.metadata.map((item) => (
                    <div key={item.label} className="border-l-2 border-[#cea605]/70 pl-4">
                      <dt className="text-sm text-[#f2de8c] mb-2">{item.label}</dt>
                      <dd className="text-base text-white leading-relaxed">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {experience.primaryDocument && <CredentialPreview document={experience.primaryDocument} />}
            </Reveal>

            <section aria-labelledby="experience-summary" className="border-l-2 border-[#cea605] pl-5 sm:pl-6 space-y-3 mb-12">
              <h2 id="experience-summary" className="text-sm font-mono uppercase tracking-widest text-[#f2de8c]">Overview</h2>
              <p className="text-base sm:text-lg text-white font-light leading-[1.8] max-w-5xl">{experience.overview}</p>
            </section>

            {experience.sections.map((section) => (
              <Reveal as="section" key={`${slug}-${section.id}`} initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4 }} id={section.id} className="border-t border-white/15 py-10 space-y-6 scroll-mt-8">
                <h2 className="text-2xl sm:text-3xl font-light border-l-2 border-[#cea605] pl-4 leading-snug">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-base sm:text-[17px] text-[#d4d4d4] font-light leading-[1.8] max-w-5xl">{paragraph}</p>)}
                {section.bullets && <ul className="list-disc pl-5 space-y-3 text-base sm:text-[17px] text-[#d4d4d4] leading-[1.8] marker:text-[#cea605]">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                {section.rows && <div className="divide-y divide-white/10 border-y border-white/10">{section.rows.map((row) => (
                  <div key={row.title} className="py-5 grid gap-3 transition-colors duration-200 hover:bg-[#cea605]/[0.04] motion-reduce:transition-none md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
                    <h3 className="text-lg font-normal">{row.title}</h3>
                    <p className="text-base text-[#d4d4d4] leading-[1.8]">{row.text}</p>
                  </div>
                ))}</div>}
              </Reveal>
            ))}

            {experience.documents?.length > 0 && (
              <section id="documents" className="border-t border-white/15 py-10 space-y-6 scroll-mt-8">
                <h2 className="text-2xl sm:text-3xl font-light border-l-2 border-[#cea605] pl-4">Official documents</h2>
                <p className="text-base text-[#d4d4d4] leading-relaxed">The completion certificate is shown above. The recommendation letter is presented separately below.</p>
                <div className="max-w-xl">{experience.documents.map((document) => <CredentialPreview key={document.title} document={document} showActions={document.showActions !== false} />)}</div>
              </section>
            )}

            {experience.courseCertificates && (
              <section id="certifications" className="border-t border-white/15 py-10 space-y-6 scroll-mt-8">
                <h2 className="text-2xl sm:text-3xl font-light border-l-2 border-[#cea605] pl-4">Course certificates</h2>
                <p className="text-base text-[#d4d4d4] leading-relaxed">The 12 courses in the professional certificate program.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {experience.courseCertificates.map((certificate, index) => (
                    <Reveal as="div"
                      key={certificate.id}
                      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
                      className="h-full motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1"
                    >
                      <CertificateCard
                        image={certificate.documentUrl}
                        title={certificate.title}
                        description={certificate.description}
                        issuer={certificate.issuer}
                        completionDate={certificate.completionDate}
                        skills={certificate.skills}
                        verifyLink={certificate.verifyLink}
                        reserveEmptyPreview
                      />
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            <section id="projects" className="border-t border-white/15 py-10 space-y-6 scroll-mt-8">
              <h2 className="text-2xl sm:text-3xl font-light border-l-2 border-[#cea605] pl-4">Related project evidence</h2>
              <div className="grid gap-4">
                {experience.projects.map((project) => (
                  <div key={project.to} className="p-5 sm:p-6 rounded-2xl border border-[#725c02]/40 bg-white/[0.03] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-[#cea605] hover:shadow-[0_0_25px_rgba(206,166,5,0.15)] transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none">
                    <div><h3 className="text-xl font-light">{project.title}</h3><p className="text-base text-[#d4d4d4] leading-relaxed mt-2">{project.description}</p></div>
                    <Link to={project.to} className={`${credentialActionClass} shrink-0 self-start`} aria-label={`Read case study: ${project.title}`}>Read case study <span aria-hidden="true">→</span></Link>
                  </div>
                ))}
              </div>
            </section>

          </>
        ) : (
          <div className="mt-12 space-y-4">
            <h1 className="text-3xl sm:text-5xl font-light">Experience not found</h1>
            <p className="text-base text-[#d4d4d4]">Choose an entry from the experience & education section.</p>
            <Link to="/#experience" className={credentialActionClass}>View experience & education</Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default ExperiencePage;
