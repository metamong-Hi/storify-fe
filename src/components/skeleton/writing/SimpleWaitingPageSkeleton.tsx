// components/SimpleWaitingPageSkeleton.tsx
import React from 'react';

const SimpleWaitingPageSkeleton: React.FC = () => {
  return (
    <div className="w-[60vw] h-[20vh] flex flex-col justify-center items-center space-y-4">
      <div className="animate-pulse flex flex-col space-y-2">
        <div className="h-4 skeleton w-3/4"></div>
        <div className="h-4 skeleton w-2/3"></div>
        <div className="h-4 skeleton w-1/2"></div>
      </div>
      <div className="mt-4 w-48 h-10 skeleton animate-pulse"></div>
    </div>
  );
};

export default SimpleWaitingPageSkeleton;
