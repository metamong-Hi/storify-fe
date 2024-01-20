"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import BigButton from '@/components/buttons/bigButton';
import Image from 'next/image';
import Link from 'next/link';
import SpeechBubble from "@/components/speechBubble/speechBubble";

const ParentComponent: React.FC = () => {
  const [modalShow, setModalShow] = useState(true);

  return (
    <div>
        <SpeechBubble
          imageSrc="/images/furnitures/speechBubble.png"
          alt="Descriptive Alt Text"
          overlayText="요정의 도움을 받으려면 고급생성을 눌러줘!"
        />
      <DoubleModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        children1={
          <div className="flex flex-col justify-center items-center text-center">
            <Image
              src="/images/angels/writing.png" 
              alt="Image Description"
              width={400}  
              height={400}
            />
            <Link href="/writing/simpleWriting" passHref>
              <BigButton>단순 생성</BigButton>
            </Link>
          </div>
        }
        children2={
          <div className="text-center">
            <Image
              src="/images/angels/writing.png" 
              alt="Image Description"
              width={400}  
              height={400}
              style={{ opacity: 0 }}
            />
            <Link href="/writing/complexWriting/events" passHref>
              <BigButton>고급 생성</BigButton>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default ParentComponent;