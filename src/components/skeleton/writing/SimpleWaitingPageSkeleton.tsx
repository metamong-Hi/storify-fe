// components/SimpleWaitingPageSkeleton.tsx
import React from 'react';

const SimpleWaitingPageSkeleton: React.FC = () => {
  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw] h-[60vh] flex flex-col justify-center items-center space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="h-4 skeleton w-3/4"></div>
        <div className="h-4 skeleton w-2/3"></div>
        <div className="h-4 skeleton w-1/2"></div>
      </div>
      <div className="mt-4 w-48 h-10 skeleton"></div>
    </div>
  );
};

export default SimpleWaitingPageSkeleton;
