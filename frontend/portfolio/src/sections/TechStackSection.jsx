import Reveal from '../components/ui/Reveal';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import SkillCard from '../components/cards/SkillCard';
import { skillCategories } from '../content/skillsData';

const CATEGORY_LABELS = {
  backend: 'Backend',
  databases: 'Data & Storage',
  cloud: 'Cloud & CS',
  testing: 'Testing',
  frontend: 'Frontend',
};

const TechStackSection = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="tech-stack-heading" className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 scroll-mt-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-7 max-w-3xl">
          <h2 id="tech-stack-heading" className="text-3xl sm:text-5xl font-light tracking-tight">Tech Stack</h2>
          <p className="mt-3 text-base text-[#d4d4d4] leading-relaxed">Backend, data, and cloud delivery — supported by testing and responsive interfaces.</p>
          <p className="mt-2 text-sm text-[#b3b3b3] leading-relaxed">Practical experience unless marked as working knowledge, basic, or academic.</p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/15">
          {skillCategories.map((category) => (
            <Reveal as="article"
              key={category.id}
              aria-labelledby={`stack-${category.id}`}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3 }}
              className="grid gap-3 py-5 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-6"
            >
              <h3 id={`stack-${category.id}`} className="border-l-2 border-[#cea605] pl-3 text-lg font-normal self-start lg:mt-1.5">{CATEGORY_LABELS[category.id]}</h3>
              <div className="min-w-0">
                <ul className="flex flex-wrap items-center gap-2">
                  {category.skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
                </ul>
                <div className="mt-1 flex flex-wrap gap-x-5">
                  {category.evidence.map((project) => (
                    <Link
                      key={project.to}
                      to={project.to}
                      aria-label={`Related work: ${project.label}`}
                      className="inline-flex min-h-11 items-center gap-1.5 text-xs text-[#f2de8c] underline underline-offset-4 decoration-[#cea605]/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2de8c]"
                    >
                      {project.label.split(' — ')[0]}<span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
