"use client"
import React, { useState, useRef  } from 'react';
import BackgroundWritingForm from '@/components/forms/writingForms/backgroundWritingForm';
import Image from 'next/image';


const Backgrounds: React.FC = () => {

  const [formText, setFormText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="h-[100vh] w-full bg-pastelBlue flex flex-col  items-center p-1">
    <h1 className="text-6xl font-bold text-white mb-4">고급 생성(시간적, 공간적 배경)</h1>
    <BackgroundWritingForm text={formText} setText={setFormText} destination="/writing/complexWriting/people"/>
  </div>
  );
};
export default Backgrounds;