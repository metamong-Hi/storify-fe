'use client';
import React, { useState } from 'react';
import SettingsComponent from '@/components/Setting/Theme';
import BackgroundMusic from '@/components/Setting/BackgroundMusic';
import FontSelector from '@/components/Setting/Font';

const TestBH: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('music');

  const renderComponent = () => {
    switch (currentTab) {
      case 'music':
        return <BackgroundMusic />;
      case 'theme':
        return <SettingsComponent />;
      case 'font':
        return <FontSelector />;
      default:
        return null; // Or a default component
    }
  };

  return (
    <div className="min-h-screen min-w-[80vw] flex flex-col justify-center items-center text-center">
      <div role="tablist" className="tabs tabs-lifted">
        <a role="tab" className={`tab ${currentTab === 'theme' ? 'tab-active' : ''}`} onClick={() => setCurrentTab('theme')}>
          테마
        </a>
        <a role="tab" className={`tab ${currentTab === 'font' ? 'tab-active' : ''}`} onClick={() => setCurrentTab('font')}>
          글꼴
        </a>
        <a role="tab" className={`tab ${currentTab === 'music' ? 'tab-active' : ''}`} onClick={() => setCurrentTab('music')}>
          배경음악
        </a>
      </div>
      {renderComponent()}
    </div>
  );
};

export default TestBH;
