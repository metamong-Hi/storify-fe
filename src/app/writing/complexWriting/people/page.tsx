"use client"
import React, { useState, useRef  } from 'react';
import Image from 'next/image';
import PeopleWritingForm from '@/components/forms/writingForms/peopleWritingForm';
const PeoplePage: React.FC = () => {
  const [formText, setFormText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="h-[92vh] w-full  flex flex-col  items-center p-10 bg-[#FAF3E0]/80">
      <h1 className="text-4xl font-bold text-[#1E212D] mb-4">자세히 만들기</h1>
      <PeopleWritingForm text={formText} setText={setFormText} destination="/writing/complexWriting/events"/>
    </div>
  );
};

export default PeoplePage;