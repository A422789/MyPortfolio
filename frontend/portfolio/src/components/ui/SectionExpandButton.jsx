import React from 'react';

const SectionExpandButton = ({
  isExpanded,
  onToggle,
  hiddenCount = 0,
  expandLabel = 'Show More',
  collapseLabel = 'Show Less',
  sectionId,
}) => {
  const handleClick = () => {
    if (isExpanded && sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    onToggle();
  };

  return (
    <div className="flex justify-center items-center mt-14 w-full">
      <button
        type="button"
        onClick={handleClick}
        className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/[0.03] hover:bg-[#cea605]/15 border border-[#725c02]/50 hover:border-[#cea605] text-[#f2de8c] hover:text-white text-sm font-normal tracking-wide shadow-[0_0_20px_rgba(206,166,5,0.15)] hover:shadow-[0_0_30px_rgba(206,166,5,0.35)] transition-all duration-300 ease-out cursor-pointer active:scale-95"
      >
        <span>{isExpanded ? collapseLabel : expandLabel}</span>
        {!isExpanded && hiddenCount > 0 && (
          <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-[#cea605]/20 text-[#f2de8c] border border-[#cea605]/40">
            +{hiddenCount}
          </span>
        )}
        <svg
          className={`w-4 h-4 text-[#cea605] transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default SectionExpandButton;

