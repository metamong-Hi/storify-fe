"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import ComplexWritingForm from '@/components/forms/complexWritingForm';
import Image from 'next/image';
import SpeechBubble from "@/components/speechBubble/speechBubble";

const People: React.FC = () => {
  const [modalShow, setModalShow] = useState(true);


  return (
    <div>
        <SpeechBubble
          imageSrc="/images/furnitures/speechBubble.png"
          alt="Descriptive Alt Text"
          overlayText="등장하는 인물(사람, 동물)을 자세히 적어줘"
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
        children2={<ComplexWritingForm destination="/writing/complexWriting/background"/>} // SimpleWritingForm을 children2로 사용
      />
    </div>
  );
};

export default People;