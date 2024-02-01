import React from "react";

const ComplexCardSkeleton = () => {
  return (
    <div className="card w-full sm:w-48 md:w-64 lg:w-80 xl:w-96 2xl:w-128 glass ml-0 sm:ml-1 md:ml-2 lg:ml-3 xl:ml-4 2xl:ml-6 mt-10 cursor-pointer">
      <div className="h-64 bg-base-300 rounded-t-lg">
        <div className="h-full skeleton"></div>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="h-6 bg-base-300 skeleton w-3/4 mb-2"></h2>
        <p className="h-4 bg-base-300 skeleton w-1/2 mb-2"></p>
        <p className="h-4 bg-base-300 skeleton w-1/2"></p>
      </div>
    </div>
  );
};

export default ComplexCardSkeleton;
