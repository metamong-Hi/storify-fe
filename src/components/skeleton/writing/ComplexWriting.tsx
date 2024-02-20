import React from 'react';

const ComplexWriting: React.FC = () => {
  const SkeletonElement = ({ className }: { className: string }) => (
    <div className={`animate-pulse ${className} skeleton`}></div>
  );

  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw]">
      <SkeletonElement className="h-8 w-3/4 mb-4" />
      <div className="space-y-2">
        {Array(1).fill(null).map((_, index) => (
          <SkeletonElement key={index} className="h-6 w-1/3 mb-2" />
        ))}
      </div>
      <div className="space-y-4 my-4">
        {Array(2).fill(null).map((_, index) => (
          <div key={index} className="flex space-x-2">
            <SkeletonElement className="h-12 w-12" /> 
            <SkeletonElement className="h-6 w-3/4" /> 
          </div>
        ))}
      </div>
      <SkeletonElement className="h-10 w-full mb-4" />
      <div className="flex justify-between mt-4">
        <SkeletonElement className="h-10 w-24" />
        <SkeletonElement className="h-10 w-24" />
        <SkeletonElement className="h-10 w-24" />
      </div>
    </div>
  );
};

export default ComplexWriting;
