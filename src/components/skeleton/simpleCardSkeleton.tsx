import React from "react";

const SimpleCardSkeleton = () => {
  return (
    <div className="card w-full sm:w-48 md:w-64 lg:w-80 xl:w-96 2xl:w-128 glass mr-0 sm:mr-1 md:mr-2 lg:mr-3 xl:mr-4 2xl:mr-6 mt-10 animate-pulse">
      <div className="h-64 bg-gray-300 rounded-t-lg"></div>
      <div className="card-body items-center text-center">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SimpleCardSkeleton;
