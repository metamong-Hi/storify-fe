'use client';
import React, { useState } from 'react';
import SettingsComponent from '@/components/Setting/Theme';
import BackgroundMusic from '@/components/Setting/BackgroundMusic';
import FontSelector from '@/components/Setting/Font';

const Setting: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('theme');

  const renderComponent = () => {
    switch (currentTab) {
      case 'music':
        return <BackgroundMusic />;
      case 'theme':
        return <SettingsComponent />;
      case 'font':
        return <FontSelector />;
      default:
        return <SettingsComponent />;
    }
  };

  return (
    <div className=" min-h-[70vh] w-full flex flex-col pl-[4vw] pr-[4vw]">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full p-8 ">
        <div role="tablist" className="tabs tabs-lifted relative justify-start p-5 ">
          <a role="tab" className={`tab text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'theme' ? 'tab-active' : ''}`} onClick={() => setCurrentTab('theme')}>
            테마
          </a>
          <a role="tab" className={`tab text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'font' ? 'tab-active' : ''}`} onClick={() => setCurrentTab('font')}>
            글꼴
          </a>
          <a role="tab" className={`tab text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content ${currentTab === 'music' ? 'tab-active' : ''}`} onClick={() => setCurrentTab('music')}>
            배경음악
          </a>
        </div>
        <>
        </>
      </div>

      {/* Content centered */}
      <div className="flex-grow flex items-center justify-center">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Setting;
