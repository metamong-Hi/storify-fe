'use client';
import React, { useState } from 'react';

import SpeechToText from '@/components/speech/SpeechToText';
import Intro1 from '@/components/home/Intro1';

const TestBH: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center text-center">
      <div className="container mx-auto p-4">
        
      <Intro1 />
      </div>
    </div>
  );
};

export default TestBH;
