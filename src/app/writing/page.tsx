"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import SpeechBubble from '@/components/speechBubble/speechBubble';
import BigButton from '@/components/buttons/bigButton';
import Image from 'next/image';

const ParentComponent: React.FC = () => {
  const [modalShow, setModalShow] = useState(true); // Set to true for demonstration

  const handleFirstButtonClick = () => {
    console.log("First button clicked");
    // 여기에 첫 번째 버튼에 대한 로직을 추가하세요
  };

  const handleSecondButtonClick = () => {
    console.log("Second button clicked");
    // 여기에 두 번째 버튼에 대한 로직을 추가하세요
  };

  return (
    <div>
      {/* Speech Bubble with Higher z-index */}
      <div className="flex justify-center items-top h-screen" style={{ zIndex: 20 }}> {/* Adjust z-index as needed */}
        <SpeechBubble
          imageSrc="/images/furnitures/speechBubble.png"
          alt="Descriptive Alt Text"
          overlayText="Your Overlay Text Here"
        />
      </div>

      {/* Double Modal with Lower z-index */}
      <div style={{ zIndex: 10 }}> {/* Adjust z-index as needed */}
        <DoubleModal
          show={modalShow}
          onClose={() => setModalShow(false)}
          children1={
            <div className="text-center">
              <Image
                src="/images/angels/writing.png" 
                alt="Image Description"
                width={256}  
                height={256}
              />
              <BigButton onClick={handleFirstButtonClick}>단순 생성</BigButton>
            </div>
        }
          children2={<BigButton onClick={handleFirstButtonClick}>고급 생성</BigButton>}
        />
      </div>

      {/* Other content can go here */}
    </div>
  );
};

export default ParentComponent;
