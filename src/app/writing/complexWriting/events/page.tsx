"use client"
import React, { useState, useRef  } from 'react';
import EventsWritingForm from '@/components/forms/writingForms/eventsWritingForm';
import Image from 'next/image';

const Events: React.FC = () => {

  const [formText, setFormText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (

    <div className="h-[91vh] w-full  flex flex-col  items-center p-10">
    <h1 className="text-4xl font-bold text-black mb-4">자세히 만들기</h1>
    <EventsWritingForm text={formText} setText={setFormText} destination="/writing/complexWriting/backgrounds"/>
  </div>
  );
};

export default Events;