'use client';
import React, { useState } from 'react';
import SettingsComponent from '@/components/userSetting/Theme';
const BackgroundMusic = React.lazy(() => import('@/components/userSetting/BackgroundMusic'));
const FontSelector = React.lazy(() => import('@/components/userSetting/Font'));

const Setting: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('theme');
  const [isLoading, setIsLoading] = useState(true); 



  const renderComponent = () => {
    switch (currentTab) {
      case 'theme':
        return <SettingsComponent />;
      case 'font':
        return <FontSelector />;
      case 'music':
        return <BackgroundMusic />;
      default:
        return <SettingsComponent />;
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
            className={`tab text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'theme' ? 'tab-active' : ''}`}
            onClick={() => setCurrentTab('theme')}
          >
            테마
          </a>
          <a
            role="tab"
            className={`tab text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'font' ? 'tab-active' : ''}`}
            onClick={() => setCurrentTab('font')}
          >
            글꼴
          </a>
          <a
            role="tab"
            className={`tab text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'music' ? 'tab-active' : ''}`}
            onClick={() => setCurrentTab('music')}
          >
            배경음악
          </a>
        </div>
        <></>
      </div>
      <div className="flex-grow flex items-center justify-center">{renderComponent()}</div>
    </div>
  );
};

export default Setting;
