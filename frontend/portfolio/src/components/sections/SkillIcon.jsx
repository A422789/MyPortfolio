import React from 'react';

const SkillIcon = ({ icon, name, delay = 0 }) => {
  return (
    <div
      className="flex flex-col items-center gap-3 text-center transition-all duration-500"
      style={{ transitionDelay: `${delay * 50}ms` }}
    >
      <div className="
        p-4 sm:p-5 w-fit rounded-full 
        backdrop-blur-lg 
        border border-[#cea605]/30 
        bg-black/50
        shadow-lg shadow-[#cea605]/20 
        hover:shadow-2xl hover:shadow-[#f2de8c]/40 
        hover:scale-110 
        hover:-translate-y-2
        active:scale-95
        transition-all duration-300 ease-out 
        hover:border-[#f2de8c]/70 
        group relative overflow-hidden
      ">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f2de8c]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        
        <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
          <div
            className="w-full h-full text-[#cea605] group-hover:text-[#f2de8c] transition-colors duration-300 [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-current [&_path]:fill-current"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        </div>
      </div>
      
      <p className="text-[#b3b3b3] text-sm sm:text-base font-medium tracking-wide">
        {name}
      </p>
    </div>
  );
};

export default SkillIcon;
