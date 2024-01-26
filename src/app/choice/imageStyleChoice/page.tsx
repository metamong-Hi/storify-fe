"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import Image from 'next/image';
import Link from 'next/link';
import SimpleCard from '@/components/objects/cards/simple';
import ComplexCard from '@/components/objects/cards/complex';
import StoryChoiceForm from '@/components/forms/choiceForms/storyChoiceForm';
import ImageStyleChoiceForm from '@/components/forms/choiceForms/imageStyleForm';
const ImageStyleChoice: React.FC = () => {
    const [formText, setFormText] = useState('');

  return (
    <div className="h-[100vh] w-full bg-pastelRed flex flex-col items-center p-1">
    <h1 className="text-6xl font-bold text-white">추천 그림체 선택</h1>
    <div className="w-full h-full flex flex-row justify-around items-center">
    <ImageStyleChoiceForm  text={formText} setText={setFormText} destination="/writing/complexWriting/people"/>
    </div>
  </div>
  );
};

export default ImageStyleChoice;
