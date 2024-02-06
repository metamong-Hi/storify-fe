'use client';
import React, { useState } from 'react';

import SpeechToText from '@/components/speech/SpeechToText';
import Intro1 from '@/components/home/intro/Intro1';

const TestBH: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <div className="container mx-auto p-4">
        
      <Intro1 />
      </div>
    </div>
  );
};

export default TestBH;
