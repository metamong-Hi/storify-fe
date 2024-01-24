"use client"
import React, { useState, useRef  } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import ComplexWritingForm from '@/components/forms/complexWritingForm';
import Image from 'next/image';
import SpeechBubbleV from '@/components/objects/speechBubble/speechBubble2';
import Eraser from '@/components/objects/eraserAndPencil/eraser';
import Pencil from '@/components/objects/eraserAndPencil/pencil';
const People: React.FC = () => {
  const [formText, setFormText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleEraserClick = () => {
    setFormText('');
  };

  const handlePencilClick = () => {
    console.log('Pencil clicked');
    textAreaRef.current?.focus(); // Focus the textarea when pencil is clicked
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/images/backGround/woodTableBackground3.jpg")',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col justify-between items-center h-full"> {/* Flex container */}
          
        <div className="flex flex-row justify-end items-center w-1/2">
            <Eraser onClick={handleEraserClick} />
            <Pencil onClick={handlePencilClick} />
            
          </div>
        <div className="relative flex-grow">
          <DoubleModal
            children1={
              <div className="flex flex-col justify-center items-center text-center relative">
                <SpeechBubbleV
                  imageSrc="/images/furnitures/speechBubble.png"
                  alt="Descriptive Alt Text"
                  overlayText="누가 누가 등장하는 지 적어줘"
                />
                <Image
                  src="/images/angels/writing.png"
                  alt="Image Description"
                  width={400}
                  height={400}
                />
              </div>
            }
            children2={<ComplexWritingForm text={formText} setText={setFormText} textAreaRef={textAreaRef} destination="/writing/complexWriting/backgrounds"/>}
          />

        </div>
      </div>
    </div>
  );
};

export default People;