import Reveal from '../components/ui/Reveal';
import { useState } from 'react';
import { projectsData } from '../content/projectsData';
import ArchiveProjectCard from '../components/cards/ArchiveProjectCard';
import ActionButton from '../components/ui/ActionButton';
import SectionExpandButton from '../components/ui/SectionExpandButton';

const ARCHIVE_CATEGORIES = [
  {
    id: 'fullstack',
    tag: 'CATEGORY 01 · BACKEND, FULL-STACK & CLOUD',
    title: 'Full-Stack, Backend & Cloud Systems',
    description:
      'Full-stack MERN applications, RESTful APIs, authentication & RBAC pipelines, and containerized cloud deployments.',
  },
  {
    id: 'academic',
    tag: 'CATEGORY 02 · UNIVERSITY COMPUTER SCIENCE',
    title: 'Academic CS Foundations (DSA & OOP)',
    description:
      'Core Software Engineering coursework projects from Riphah International University applying Data Structures & Algorithms in C++ and Object-Oriented Programming in Java.',
  },
  {
    id: 'frontend',
    tag: 'CATEGORY 03 · FRONTEND & CLOUD BAAS',
    title: 'Frontend Applications & UI Engineering',
    description:
      'Ordered by engineering depth — leading with our unified React + Firebase/Cloudinary E-Commerce Ecosystem, Enterprise Analytics Dashboard, and Gemini AI client, followed by core JavaScript and responsive UI foundations.',
  },
];

const ProjectsArchivePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllFrontend, setShowAllFrontend] = useState(false);

  const fullstackCount = projectsData.filter((p) => p.category === 'fullstack').length;
  const academicCount = projectsData.filter((p) => p.category === 'academic').length;
  const frontendCount = projectsData.filter((p) => p.category === 'frontend').length;

  const filterTabs = [
    { id: 'all', label: `All Systems (${projectsData.length})` },
    { id: 'fullstack', label: `Full-Stack & Cloud (${fullstackCount})` },
    { id: 'academic', label: `Academic CS (${academicCount})` },
    { id: 'frontend', label: `Frontend Apps (${frontendCount})` },
  ];

  const visibleCategories =
    activeFilter === 'all'
      ? ARCHIVE_CATEGORIES
      : ARCHIVE_CATEGORIES.filter((cat) => cat.id === activeFilter);

  return (
    <section className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#cea605] block">
            COMPLETE ENGINEERING ARCHIVE & CASE STUDIES
          </span>
          <Reveal as="h1"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-light tracking-tight text-white"
          >
            Projects & Case Studies
          </Reveal>
          <p className="text-sm sm:text-base text-[#a3a3a3] font-light max-w-2xl mx-auto leading-relaxed">
            Explore deep-dive architectural case studies for full-stack systems, cloud container deployments, interactive React applications, and university computer science foundations.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#cea605] text-black font-medium shadow-[0_0_20px_rgba(206,166,5,0.4)]'
                      : 'bg-transparent text-[#b3b3b3] hover:text-[#f2de8c] border border-white/10 hover:border-[#cea605]/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categorized Project Sections */}
        <div className="space-y-20">
          {visibleCategories.map((category) => {
            const categoryProjects = projectsData.filter((p) => p.category === category.id);
            const isFrontend = category.id === 'frontend';
            const displayedProjects =
              isFrontend && !showAllFrontend
                ? categoryProjects.slice(0, 3)
                : categoryProjects;

            return (
              <div key={category.id} id={category.id} className="space-y-8">
                <div className="border-b border-white/10 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1.5 max-w-3xl">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#cea605] block">
                      {category.tag}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-light text-white">
                      {category.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#a3a3a3] font-light leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-[#f2de8c] px-3 py-1 rounded-full bg-[#cea605]/10 border border-[#725c02]/50 w-fit shrink-0">
                    {categoryProjects.length} {categoryProjects.length === 1 ? 'Project' : 'Projects'}
                  </span>
                </div>

                <div className="flex flex-col gap-8">
                  {displayedProjects.map((project, index) => (
                    <Reveal as="div"
                      key={project._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ArchiveProjectCard project={project} index={index} />
                    </Reveal>
                  ))}
                </div>

                {isFrontend && categoryProjects.length > 3 && (
                  <SectionExpandButton
                    isExpanded={showAllFrontend}
                    onToggle={() => setShowAllFrontend((prev) => !prev)}
                    hiddenCount={categoryProjects.length - 3}
                    expandLabel="Show More Frontend Projects"
                    collapseLabel="Show Less"
                    sectionId="frontend"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Back CTA */}
        <div className="flex justify-center pt-8 border-t border-white/10">
          <ActionButton variant="subtle" to="/#projects" className="px-7 py-3 rounded-full text-sm">
            ← Back to Overview
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default ProjectsArchivePage;
