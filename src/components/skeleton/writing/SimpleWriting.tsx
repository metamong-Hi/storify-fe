import React from 'react';

const SimpleWriting: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw]">
      <div className="skeleton h-12 w-52  mb-2"></div>
      <div className="skeleton h-12 w-52  mb-6"></div>
      <div className="skeleton h-[280px] w-[360px] sm:w-[520px] md:w-[720px] lg:w-[840px] xl:w-[960px] 2xl:w-[1080px] mb-6"></div>
      <div className="w-full flex justify-between items-center">
        <div className="skeleton h-12 w-24  "></div>
        <div className="skeleton h-12 w-24  "></div>
        <div className="skeleton h-12 w-24  "></div>
      </div>
    </div>
  );
};

export default SimpleWriting;
