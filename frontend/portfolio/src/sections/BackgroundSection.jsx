import Reveal from '../components/ui/Reveal';
import { useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ActionButton from '../components/ui/ActionButton';
import { backgroundData } from '../content/backgroundData';
import { useProfile } from '../context/ProfileContext';
import PortfolioImage from '../components/ui/PortfolioImage';

const BackgroundSection = () => {
  const { profile } = useProfile();
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const aboutImageUrl =
    profile?.aboutImage?.url ||
    'https://res.cloudinary.com/djwqb3ibk/image/upload/v1793982095/portfolio/profile/AboutSec_bqpihy.png';

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="background-heading"
      className="bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <Reveal as="div"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: 'easeOut' }}
            className="w-full min-w-0 lg:w-3/5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#725c02]/60 bg-[#cea605]/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#cea605]" />
              <span className="text-xs font-normal text-[#f2de8c] tracking-wider uppercase">
                {profile?.location || 'Islamabad, Pakistan'}
              </span>
            </div>

            <h2 id="background-heading" className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              {backgroundData.heading.intro}{' '}
              <span className="text-[#cea605] font-normal">{backgroundData.heading.emphasis}</span>{' '}
              {backgroundData.heading.ending}
            </h2>

            <div className="max-w-prose space-y-4 text-sm sm:text-base text-[#d4d4d4] font-light leading-relaxed">
              {backgroundData.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <div className="flex flex-wrap gap-3">
              {backgroundData.actions.map((action) => (
                <ActionButton
                  key={action.to}
                  variant="subtle"
                  to={action.to}
                  className="min-h-11 rounded-xl px-5 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2de8c] motion-reduce:transition-none"
                >
                  {action.label}<span aria-hidden="true">→</span>
                </ActionButton>
              ))}
            </div>
          </Reveal>

          <Reveal as="div"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
            className="w-full min-w-0 lg:w-2/5 flex justify-center items-center relative"
          >
            <div className="group relative aspect-square w-full max-w-72 sm:max-w-96 rounded-3xl overflow-hidden bg-black/60 border border-[#725c02]/40 hover:border-[#cea605] transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_28px_rgba(206,166,5,0.2)] motion-reduce:transition-none">
              <PortfolioImage
                src={aboutImageUrl}
                alt={`Portrait of ${profile?.name || 'Ahmed Ayyad'}`}
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;

