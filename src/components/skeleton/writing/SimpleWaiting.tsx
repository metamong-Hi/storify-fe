import React from 'react';

const SimpleWaiting: React.FC = () => {
  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw] h-[60vh] flex flex-col justify-center items-center space-y-4">
      <div className="flex flex-col space-y-2 mb-24">
        <div className="skeleton h-16 w-64"></div>
      </div>
      <div className="skeleton mt-4 w-24 h-12 "></div>
    </div>
  );
};

export default SimpleWaiting;
