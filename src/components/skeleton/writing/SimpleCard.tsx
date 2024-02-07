import React from 'react';

const SimpleCardSkeleton = () => {
  return (
    <div className="card w-44 sm:w-52 md:w-60 lg:w-80 xl:w-96 2xl:w-112 glass mr-1 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5 2xl:mr-6 mt-10 cursor-pointer">
      <div className="h-44 sm:h-52 md:h-60 lg:h-80 xl:h-96 2xl:h-112 bg-base-300 rounded-t-lg">
        <div className="h-full skeleton"></div>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="h-6 bg-base-300 skeleton w-3/4 mb-1"></h2>
        <p className="h-4 bg-base-300 skeleton w-1/2 mb-1"></p>
        <p className="h-4 bg-base-300 skeleton w-1/2"></p>
      </div>
    </div>
  );
};

export default SimpleCardSkeleton;
