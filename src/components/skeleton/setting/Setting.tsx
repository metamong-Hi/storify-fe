import React from 'react';

const SkeletonLoader = () => {
  return <div className="skeleton h-8 w-44"></div>;
};

const ThemeSkeleton = () => {
  return <div className="skeleton w-160 h-112"></div>;
};

const Setting: React.FC = () => {
  return (
    <div className=" min-h-[70vh] w-full flex flex-col pl-[4vw] pr-[4vw]">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 2xl:p-10 ">
        <div className="tabs tabs-lifted relative justify-start p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6 ">
          <SkeletonLoader />
        </div>
        <></>
      </div>
      <div className="flex justify-center items-center">
        <ThemeSkeleton />
      </div>
    </div>
  );
};

export default Setting;
