"use client"
import React from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import SimpleWritingForm from '@/components/forms/simpleWritingForm';
import Image from 'next/image';
import SpeechBubble from "@/components/objects/speechBubble/speechBubble";
import SpeechBubbleV from '@/components/objects/speechBubble/speechBubble2';
import Eraser from '@/components/objects/eraserAndPencil/eraser';
import Pencil from '@/components/objects/eraserAndPencil/pencil';

const ParentComponent: React.FC = () => {

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
        <div className="flex flex-row justify-end items-center">
            <Eraser />
            <Pencil />
          </div>
        <div className="relative flex-grow">
          <DoubleModal
            children1={
              <div className="flex flex-col justify-center items-center text-center relative">
                <SpeechBubbleV
                  imageSrc="/images/furnitures/speechBubble.png"
                  alt="Descriptive Alt Text"
                  overlayText="오늘 있었던 일을 자세히 적어줘"
                />
                <Image
                  src="/images/angels/writing.png"
                  alt="Image Description"
                  width={400}
                  height={400}
                />
              </div>
            }
            children2={<SimpleWritingForm destination="/"/>}
          />

        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
