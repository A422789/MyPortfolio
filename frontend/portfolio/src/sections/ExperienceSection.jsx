import React from 'react';
import ActionButton from '../components/ui/ActionButton';

const ExperienceSection = () => (
  <section
    id="experience"
    className="min-h-[60vh] bg-black flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
  >
    <div className="max-w-7xl mx-auto w-full text-center">
      <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
        PROFESSIONAL EXPERIENCE
      </span>
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2">
        Engineering Experience
      </h2>
      <p className="text-sm text-[#a3a3a3] font-light mt-3 max-w-xl mx-auto">
        Skeleton placeholder for the CodeAlpha Full-Stack Internship summary (Sub-Phase 2.3).
      </p>

      <div className="mt-10 p-10 rounded-3xl bg-white/[0.02] border border-dashed border-[#725c02]/50 max-w-3xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-[#f2de8c] mb-6">
          [ Experience Section Skeleton — Ready for Sub-Phase 2.3 ]
        </p>
        <ActionButton variant="subtle" to="/credentials#experience" className="px-6 py-2.5 rounded-full">
          <span>View Full Experience & Credentials Hub →</span>
        </ActionButton>
      </div>
    </div>
  </section>
);

export default ExperienceSection;

