'use client';
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="relative w-full h-full bg-gray-200 animate-pulse">
      <div className="absolute top-[10%] left-[6%] z-10 space-y-4">
        <div className="h-12 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="h-12 w-2/3 bg-gray-300 rounded-md"></div>
        <div className="h-8 w-1/2 bg-gray-300 rounded-md"></div>
        <div className="h-8 w-1/2 bg-gray-300 rounded-md"></div>
        <div className="h-10 w-1/4 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
