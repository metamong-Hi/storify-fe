"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import ComplexWritingForm from '@/components/forms/complexWritingForm';
import Image from 'next/image';
import SpeechBubble from "@/components/speechBubble/speechBubble";


const Events: React.FC = () => {
  const [modalShow, setModalShow] = useState(true);


  return (
    <div>
        <SpeechBubble
          imageSrc="/images/furnitures/speechBubble.png"
          alt="Descriptive Alt Text"
          overlayText="  오늘 어떤 일이 있었는지 자세히 적어줘"
        />
      <DoubleModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        children1={
          <div className="flex flex-col justify-center items-center text-center" >
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