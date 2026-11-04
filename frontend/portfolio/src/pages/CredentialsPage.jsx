import React from 'react';
import ActionButton from '../components/ui/ActionButton';

const CredentialsPage = () => (
  <div className="min-h-screen bg-black text-white py-28 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto w-full space-y-16">
      <div className="text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#cea605]">
          VERIFIED TRACK RECORD
        </span>
        <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2">
          Experience, Education & Credentials
        </h1>
        <p className="text-sm text-[#a3a3a3] font-light mt-2 max-w-xl mx-auto">
          Skeleton placeholder for `/credentials` hub (Sub-Phase 2.6).
        </p>
      </div>

      <section id="experience" className="p-10 rounded-3xl bg-white/[0.02] border border-dashed border-[#725c02]/50 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#cea605] block mb-2">
          SECTION 01 • #experience
        </span>
        <h2 className="text-2xl font-light text-white">CodeAlpha Full-Stack Internship & Official Letters</h2>
      </section>

      <section id="education" className="p-10 rounded-3xl bg-white/[0.02] border border-dashed border-[#725c02]/50 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#cea605] block mb-2">
          SECTION 02 • #education
        </span>
        <h2 className="text-2xl font-light text-white">Riphah International University (BS Software Engineering)</h2>
      </section>

      <section id="certifications" className="p-10 rounded-3xl bg-white/[0.02] border border-dashed border-[#725c02]/50 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#cea605] block mb-2">
          SECTION 03 • #certifications
        </span>
        <h2 className="text-2xl font-light text-white">IBM Full-Stack JavaScript Developer Specialization (12 Courses)</h2>
      </section>

      <div className="flex justify-center pt-4">
        <ActionButton variant="subtle" to="/#home" className="px-6 py-2.5 rounded-full">
          ← Back to Overview
        </ActionButton>
      </div>
    </div>
  </div>
);

export default CredentialsPage;

