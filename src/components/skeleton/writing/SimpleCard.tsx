import React from 'react';

const SimpleCardSkeleton = () => {
  return (
    <div className="card w-64 sm:w-72 md:w-80 lg:w-96 xl:w-112 2xl:w-128 glass cursor-pointer">
      <div className="h-44 sm:h-52 md:h-60 lg:h-80 xl:h-96 2xl:h-112 bg-base-300 rounded-t-lg">
        <div className="h-full skeleton"></div>
      </div>
      <div className="card-body items-center text-center">
        <h1 className="h-6 bg-base-300 skeleton w-3/4 mb-1"></h1>
        <h2 className="h-4 bg-base-300 skeleton w-1/2 mb-1"></h2>
        <h2 className="h-4 bg-base-300 skeleton w-1/2"></h2>
      </div>
    </div>
  );
};

export default SimpleCardSkeleton;
