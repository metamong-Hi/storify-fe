"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ThemeSelector from '@/components/userSetting/Theme';
const FontSelector = dynamic(() => import('@/components/userSetting/Font'), {
  ssr: false,
});
const Setting: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('theme');

  const renderComponent = () => {
    switch (currentTab) {
      case 'theme':
        return <ThemeSelector />;
      case 'font':
        return <FontSelector />;
      default:
        return <ThemeSelector />;
    }
  };

  return (
    <div className=" min-h-[70vh] w-full flex flex-col pl-[4vw] pr-[4vw]">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 2xl:p-10 ">
        <div
          role="tablist"
          className="tabs tabs-lifted relative justify-start p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6 "
        >
          <a
            role="tab"
            className={`tab text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'theme' ? 'tab-active' : ''}`}
            onClick={() => setCurrentTab('theme')}
          >
            테마
          </a>
          <a
            role="tab"
            className={`tab text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'font' ? 'tab-active' : ''}`}
            onClick={() => setCurrentTab('font')}
          >
            글꼴
          </a>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">{renderComponent()}</div>
    </div>
  );
};

export default Setting;
