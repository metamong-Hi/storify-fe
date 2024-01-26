"use client"
import React, { useState, useRef } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import SimpleWritingForm from '@/components/forms/writingForms/simpleWritingForm';
import Image from 'next/image';
// import SpeechBubbleV from '@/components/objects/speechBubble/speechBubble2';
import Eraser from '@/components/objects/eraserAndPencil/eraser';
import Pencil from '@/components/objects/eraserAndPencil/pencil';

const ParentComponent: React.FC = () => {
  const [formText, setFormText] = useState('');
  return (
    <div className="h-[100vh] w-full bg-pastelBlue flex flex-col items-center pt-1">
    <h1 className="text-6xl font-bold text-white mb-4">단순 생성</h1>
    <SimpleWritingForm text={formText} setText={setFormText} destination="/"/>
  </div>
  );
};

export default ParentComponent;
