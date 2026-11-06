import Reveal from '../components/ui/Reveal';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { experienceData } from '../content/experienceData';

const ExperienceSection = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 scroll-mt-8"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 id="experience-heading" className="text-3xl sm:text-5xl font-light tracking-tight">Experience & Education</h2>
        <p className="text-base text-[#d4d4d4] mt-4 max-w-2xl leading-relaxed">Internship experience, professional learning, and academic foundations.</p>

        <ul className="relative mt-8 max-w-5xl mx-auto space-y-4 before:absolute before:inset-y-8 before:left-0 before:w-px before:bg-[#cea605]/30">
          {experienceData.map((experience, index) => (
            <li key={experience.slug} className="group/experience relative pl-5 sm:pl-7">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-8 size-[11px] rounded-full bg-[#cea605] ring-4 ring-black transition-[transform,background-color,box-shadow] duration-200 group-hover/experience:bg-[#25D366] group-hover/experience:shadow-[0_0_16px_5px_rgba(37,211,102,0.45)] group-focus-within/experience:bg-[#25D366] group-focus-within/experience:shadow-[0_0_16px_5px_rgba(37,211,102,0.45)] motion-safe:group-hover/experience:scale-125 motion-safe:group-focus-within/experience:scale-125 motion-reduce:transition-none"
              />
              <Reveal as="article"
                initial={reducedMotion ? false : { opacity: 0, x: 16, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                whileHover={reducedMotion ? undefined : { y: -3, transition: { duration: 0.2, delay: 0 } }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
                className="rounded-2xl border border-[#725c02]/40 bg-linear-to-br from-[#28230f] via-[#12120e] to-[#080808] p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(242,222,140,0.06),0_12px_30px_rgba(0,0,0,0.5),0_0_18px_rgba(206,166,5,0.07)] transition-[border-color,box-shadow] duration-300 group-hover/experience:border-[#cea605] group-hover/experience:shadow-[inset_0_1px_0_rgba(242,222,140,0.1),0_16px_36px_rgba(0,0,0,0.55),0_0_28px_rgba(206,166,5,0.18)] group-focus-within/experience:border-[#cea605] group-focus-within/experience:shadow-[inset_0_1px_0_rgba(242,222,140,0.1),0_16px_36px_rgba(0,0,0,0.55),0_0_28px_rgba(206,166,5,0.18)] motion-reduce:transition-none"
              >
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-mono uppercase tracking-wider text-[#f2de8c] mb-1">{experience.category}</p>
                    <h3 className="text-base sm:text-lg font-normal text-white leading-snug">{experience.title}</h3>
                    <p className="text-sm text-[#a3a3a3] mt-1 leading-relaxed">
                      {experience.organization}{experience.landingContext && <> <span aria-hidden="true">•</span> {experience.landingContext}</>}
                    </p>
                    <p className="text-sm text-[#d4d4d4] mt-2 leading-relaxed max-w-prose">{experience.landingDetail}</p>
                    <p className="mt-2 inline-block rounded border border-[#cea605]/20 bg-[#cea605]/10 px-2 py-0.5 text-xs font-mono font-light text-[#f2de8c]">{experience.metadata[0].value}</p>
                  </div>
                  <Link
                    to={`/experience/${experience.slug}`}
                    aria-label={`${experience.actionLabel}: ${experience.organization}`}
                    className="group/action inline-flex min-h-11 items-center justify-center gap-3 justify-self-start rounded-xl border border-[#cea605]/40 bg-transparent px-5 py-2.5 text-sm text-[#f2de8c] transition-[border-color,box-shadow] duration-200 hover:border-[#cea605] hover:shadow-[0_0_20px_rgba(206,166,5,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none"
                  >
                    {experience.actionLabel}
                    <span aria-hidden="true" className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/action:translate-x-1 motion-safe:group-focus-visible/action:translate-x-1">→</span>
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExperienceSection;
