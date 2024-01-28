"use client"
import React, { useState, useRef } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import SimpleWritingForm from '@/components/forms/writingForms/simpleWritingForm';
import Image from 'next/image';

const ParentComponent: React.FC = () => {
  const [formText, setFormText] = useState('');
  return (
    <div className="h-[91vh] w-full flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-black mb-4">간단히 만들기</h1>
      <div>
        <SimpleWritingForm text={formText} setText={setFormText} destination="/simpleWriting2"/>
      </div>
    
  </div>
  );
};

export default ParentComponent;
