import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';
import SkeletonLoader from '../components/common/SkeletonLoader';
import API from '../api/axios';

const CATEGORY_ORDER = ['Backend', 'Database', 'DevOps & Tools', 'Frontend', 'General'];
const GROUP_COLLAPSE_THRESHOLD = 8;

function groupSkills(skills) {
  const map = {};
  for (const skill of skills) {
    const cat = skill.category || 'General';
    const normalized =
      cat === 'DevOps' || cat === 'CI/CD' || cat === 'DevOps & CI/CD'
        ? 'DevOps & Tools'
        : cat;
    if (!map[normalized]) map[normalized] = [];
    map[normalized].push(skill);
  }
  return CATEGORY_ORDER
    .filter((c) => map[c])
    .map((c) => ({ category: c, skills: map[c] }))
    .concat(
      Object.keys(map)
        .filter((c) => !CATEGORY_ORDER.includes(c))
        .map((c) => ({ category: c, skills: map[c] }))
    );
}

function SkillTag({ skill }) {
  return (
    <span className="skill-tag" key={skill._id}>
      {skill.iconSvg && (
        <span
          className="w-3.5 h-3.5 shrink-0 [&_svg]:w-full [&_svg]:h-full"
          dangerouslySetInnerHTML={{ __html: skill.iconSvg }}
          aria-hidden="true"
        />
      )}
      {skill.name}
    </span>
  );
}

const Skills = () => {
  const [skills, setSkills]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  const { version } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    let isMounted = true;
    API.get('/skills')
      .then((res) => {
        if (isMounted) {
          setSkills(res.data?.data?.filter((s) => !s.isHidden) || []);
          setLoading(false);
        }
      })
      .catch(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const groups = groupSkills(skills);

  const toggleGroup = (cat) => {
    setExpandedGroups((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`text-4xl sm:text-5xl font-bold text-center mb-4 section-heading ${version === 'v1' ? 'logo' : ''}`}
      >
        {version === 'v2' ? (
          <>
            Technical{' '}
            <span style={{ color: 'var(--color-accent)' }}>Skills</span>
          </>
        ) : (
          'My Skills'
        )}
      </motion.h2>

      <p className="text-center mb-12 text-sm" style={{ color: 'var(--color-text-2)' }}>
        Backend-first. Full-stack capable.
      </p>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-24 h-24 rounded-2xl animate-pulse" style={{ backgroundColor: 'var(--color-surface-1)' }} />
          ))}
        </div>
      ) : (
        /* ─── Both V1 & V2: Grouped tags layout ─────────────────────── */
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {groups.map(({ category, skills: groupSkills }, gi) => {
            const isExpanded = expandedGroups[category];
            const visible    = isExpanded ? groupSkills : groupSkills.slice(0, GROUP_COLLAPSE_THRESHOLD);
            const hiddenCount = Math.max(0, groupSkills.length - GROUP_COLLAPSE_THRESHOLD);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: gi * 0.08 }}
              >
                {/* Category heading */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                  >
                    {category}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
                </div>

                {/* Tag cloud */}
                <div className="flex flex-wrap gap-2">
                  {visible.map((skill) => (
                    <SkillTag key={skill._id} skill={skill} />
                  ))}

                  {hiddenCount > 0 && (
                    <button
                      onClick={() => toggleGroup(category)}
                      className="skill-tag cursor-pointer"
                      style={{ borderStyle: 'dashed', color: 'var(--color-accent)' }}
                    >
                      {isExpanded ? `− less` : `+${hiddenCount} more`}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Skills;
