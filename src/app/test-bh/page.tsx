'use client';
import React, { useState } from 'react';
// import SimpleCard from '@/components/objects/cards/Simple';
// import ComplexCard from '@/components/objects/cards/Complex';
// import Drawer from '@/components/drawer/friend';
// import FriendPage from '@/components/drawer/friendPage';
import SpeechToText from '@/components/speech/SpeechToText';

const TestBH: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center text-center">
      <div className="container mx-auto p-4">
        <SpeechToText />
      </div>
    </div>
  );
};

export default TestBH;
