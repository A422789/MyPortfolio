import React from 'react';

export const CardSkeleton = () => (
  <div className="w-full bg-white/5 rounded-4xl p-6 flex flex-col gap-4 animate-pulse border border-white/10">
    <div className="w-full h-48 bg-white/10 rounded-3xl" />
    <div className="h-7 bg-white/10 rounded-md w-3/4" />
    <div className="space-y-2">
      <div className="h-4 bg-white/10 rounded w-full" />
      <div className="h-4 bg-white/10 rounded w-5/6" />
    </div>
    <div className="flex gap-4 mt-4">
      <div className="h-10 bg-white/10 rounded-full w-28" />
      <div className="h-10 bg-white/10 rounded-full w-28" />
    </div>
  </div>
);

export const SkillSkeleton = () => (
  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/5 border border-white/10 animate-pulse flex items-center justify-center p-4">
    <div className="w-12 h-12 bg-white/10 rounded-lg" />
  </div>
);

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
