"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import SimpleWritingForm from '@/components/forms/simpleWritingForm';
import Image from 'next/image';
import SpeechBubble from "@/components/speechBubble/speechBubble";

const ParentComponent: React.FC = () => {
  const [modalShow, setModalShow] = useState(true);

  return (
    <div>
      <SpeechBubble
          imageSrc="/images/furnitures/speechBubble.png"
          alt="Descriptive Alt Text"
          overlayText="오늘 있었던 일을 자세히 적어줘"
        />
      <DoubleModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        children1={
          <div className="flex flex-col justify-center items-center text-center" >
          <Image
            src="/images/angels/writing.png" 
            alt="Image Description"
            width={400}  
            height={400}
          />
        </div>
        }
        children2={<SimpleWritingForm destination="/"/>} // SimpleWritingForm을 children2로 사용
      />
    </div>
  );
};

export default ParentComponent;