"use client"
import React, { useState, useRef } from 'react';
import SimpleWritingForm from '@/components/forms/writingForms/simpleWritingForm';
import Image from 'next/image';

const SimplePage: React.FC = () => {
  const [formText, setFormText] = useState('');
  return (
    <div className="h-[92vh] w-full flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-4">간단히 만들기</h1>
      <div>
        <SimpleWritingForm text={formText} setText={setFormText} />
      </div>
  </div>
  );
};

export default SimplePage;
