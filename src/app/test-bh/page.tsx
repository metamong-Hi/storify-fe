'use client';
import React, { useState } from 'react';
import SpeechToText from '@/components/speech/SpeechToText';
import Intro1 from '@/components/home/intro/Intro1';
import SettingsComponent from '@/components/Setting/Theme';
import BackgroundMusic from '@/components/Setting/BackgroundMusic';



const TestBH: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <BackgroundMusic />
      <SettingsComponent />
    </div>
  );
};

export default TestBH;
