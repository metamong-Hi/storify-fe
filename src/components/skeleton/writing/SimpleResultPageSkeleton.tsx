import React from 'react';

const SimpleResultPageSkeleton: React.FC = () => {
  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw] ">
      <div className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 skeleton h-6 w-3/4"></div>
      <div className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 skeleton h-6 w-3/4"></div>
      <div className="divider"></div>
      <div className="skeleton h-[150px] w-full mb-4"></div>
      <div className="divider"></div>
    </div>
  );
};

export default SimpleResultPageSkeleton;
