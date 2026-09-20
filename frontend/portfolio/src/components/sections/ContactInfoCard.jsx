import React from 'react';

const ContactInfoCard = ({ icon, title, value, extraVal }) => {
  return (
    <div className="
      w-full bg-black 
      border border-[#cea605]/50 hover:border-[#cea605] 
      rounded-xl 
      p-4 sm:p-5
      flex flex-col sm:flex-row items-center justify-start text-center sm:text-left gap-4
      transition-all duration-300 ease-in-out
      hover:shadow-[0_0_35px_5px_rgba(206,166,5,0.4)]
      hover:-translate-y-1
    ">
      {/* Icon */}
      <div className="w-10 h-10 text-[#cea605] flex shrink-0 items-center justify-center">
        {icon}
      </div>
      {/* Content */}
      <div className="flex flex-col">
        <h4 className="font-semibold text-white text-lg">{title}</h4>
        <p className="text-[#b3b3b3] text-base break-all">
          {value} {extraVal && <><br />{extraVal}</>}
        </p>
      </div>
    </div>
  );
};

export default ContactInfoCard;
