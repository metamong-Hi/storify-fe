'use client';
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
      <div className="flex flex-col sm:flex-row justify-between items-center w-full py-8">
        <div role="tablist" className="tabs tabs-bordered relative justify-start mb-4 sm:mb-0 ">
          <a
            role="tab"
            className={`tab whitespace-nowrap text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'theme' ? 'tab-active' : ''} hover:text-primary hover:bg-primary/20`}
            onClick={() => setCurrentTab('theme')}
          >
            테마
          </a>
          <a
            role="tab"
            className={`tab whitespace-nowrap text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'font' ? 'tab-active' : ''} hover:text-primary hover:bg-primary/20`}
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
