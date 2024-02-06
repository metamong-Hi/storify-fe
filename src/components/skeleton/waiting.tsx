
import React from 'react';

const SimpleResultPageSkeleton: React.FC = () => {
  return (
    <div className="flex justify-around gap-2">
      <div className="skeleton w-16 sm:w-20 md:w-24 lg:w-36 xl:w-48 2xl:w-60"></div>
      <div className="skeleton w-16 sm:w-20 md:w-24 lg:w-36 xl:w-48 2xl:w-60"></div>
      <div className="skeleton w-16 sm:w-20 md:w-24 lg:w-36 xl:w-48 2xl:w-60"></div>
      <div className="skeleton w-16 sm:w-20 md:w-24 lg:w-36 xl:w-48 2xl:w-60"></div>
    </div>
  );
};

export default SimpleResultPageSkeleton;
