import React from 'react';

const ContactInfoCard = ({ icon, title, value, extraVal }) => {
  return (
    <div className="
      w-full bg-[var(--color-surface-1)] 
      border border-[var(--color-border)] hover:border-[var(--color-border-accent)] 
      rounded-xl 
      p-4 sm:p-5
      flex flex-col sm:flex-row items-center justify-start text-center sm:text-left gap-4
      transition-all duration-[var(--duration-color)] ease-in-out
      hover:shadow-[var(--glow-sm,var(--elevation-2))]
      hover:-translate-y-1
    ">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] flex shrink-0 items-center justify-center">
        {icon}
      </div>
      {/* Content */}
      <div className="flex flex-col">
        <h4 className="font-semibold text-[var(--color-text-1)] text-lg">{title}</h4>
        <p className="text-[var(--color-text-2)] text-base break-words">
          {value} {extraVal && <><br />{extraVal}</>}
        </p>
      </div>
    </div>
  );
};

export default ContactInfoCard;
