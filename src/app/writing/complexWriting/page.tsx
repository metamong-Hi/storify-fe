"use client"
import React, { useState, useRef  } from 'react';
import ComplexWritingForm from '@/components/forms/writingForms/complexWritingForm';
import Image from 'next/image';


const ComplexWritingPage: React.FC = () => {

  const [formText, setFormText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="h-[92vh] w-full flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-4">자세히 만들기</h1>
      <div>
        <ComplexWritingForm text={formText} setText={setFormText}/>
      </div>

    </div>
  );
};
export default ComplexWritingPage;