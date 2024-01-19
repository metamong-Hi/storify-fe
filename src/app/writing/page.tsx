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
          children2={
            <div className="text-center">
                <Image
                    src="/images/angels/writing.png" 
                    alt="Image Description"
                    width={256}  
                    height={256}
                    style={{ opacity: 0 }}
                />
                <BigButton onClick={handleFirstButtonClick}>고급 생성</BigButton>
            </div>
          }
        />
      </div>
  );
};

export default ParentComponent;

