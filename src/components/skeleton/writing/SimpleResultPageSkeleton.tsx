// components/SimpleResultPageSkeleton.tsx
import React from 'react';

const SimpleResultPageSkeleton: React.FC = () => {
  return (
    <div className="w-[60vw] animate-pulse">
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 skeleton h-6 w-3/4"></div>
      <div className="text-md sm:text-lg md:text-xl lg:text-2xl mb-4 skeleton h-6 w-1/2"></div>
      <div className="divider"></div>
      <div className="skeleton h-[150px] w-full mb-4"></div>
      <div className="divider"></div>
    </div>
  );
};

export default SimpleResultPageSkeleton;
