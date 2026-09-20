import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeClasses[size] || sizeClasses.medium} border-[#cea605]/20 border-t-[#cea605] rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-[#b3b3b3] text-sm tracking-wider font-light">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
