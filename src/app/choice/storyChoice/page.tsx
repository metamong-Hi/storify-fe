"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import Image from 'next/image';
import Link from 'next/link';
import SimpleCard from '@/components/objects/cards/simple';
import ComplexCard from '@/components/objects/cards/complex';
import StoryChoiceForm from '@/components/forms/choiceForms/storyChoiceForm';
const StoryChoice: React.FC = () => {
    const [formText, setFormText] = useState('');

  return (
    <div className="h-[100vh] w-full bg-pastelPurple flex flex-col  items-center p-1">
    <h1 className="text-6xl font-bold text-white mb-4">추천 스토리 선택</h1>
    <StoryChoiceForm text={formText} setText={setFormText} destination="/writing/complexWriting/people"/>
  </div>
   
  );
};

export default StoryChoice;

