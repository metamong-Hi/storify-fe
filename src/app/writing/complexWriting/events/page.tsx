"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import ComplexWritingForm from '@/components/forms/complexWritingForm';
import Image from 'next/image';
import SpeechBubble from "@/components/objects/speechBubble/speechBubble";
import SpeechBubbleV from '@/components/objects/speechBubble/speechBubble2';
import Eraser from '@/components/objects/eraserAndPencil/eraser';
import Pencil from '@/components/objects/eraserAndPencil/pencil';

const Events: React.FC = () => {
  const [modalShow, setModalShow] = useState(true);


  return (
    <div
    style={{
      backgroundImage: 'url("/images/backGround/woodTableBackground3.jpg")',
      backgroundSize: 'fill',
      height: '100vh', // Ensuring it covers the full viewport height
      width: '100vw',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
  }}>
        
      <DoubleModal
        children1={
          <div className="flex flex-col justify-center items-center text-center" >
            <SpeechBubbleV
          imageSrc="/images/furnitures/speechBubble.png"
          alt="Descriptive Alt Text"
          overlayText="  오늘 어떤 일이 있었는지 자세히 적어줘"
        />
          <Image
            src="/images/angels/writing.png" 
            alt="Image Description"
            width={256}  
            height={256}
          />
        </div>
        }
        children2={<ComplexWritingForm destination="/writing/complexWriting/people"/>} 
        />
    </div>
  );
};

export default Events;