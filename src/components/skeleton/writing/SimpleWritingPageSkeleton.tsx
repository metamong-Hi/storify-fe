// pages/SimpleWritingPageSkeleton.tsx
import React from 'react';

const SimpleWritingPageSkeleton: React.FC = () => {
  return (
    <div className="w-[60vw] animate-pulse">
      <div className="h-6 skeleton mb-2"></div>
      <div className="h-[250px] skeleton mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-10 w-24 skeleton "></div>
        <div className="h-10 w-24 skeleton "></div>
        <div className="h-10 w-24 skeleton "></div>
      </div>
    </div>
  );
};

export default SimpleWritingPageSkeleton;
