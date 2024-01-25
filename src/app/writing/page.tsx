"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import Image from 'next/image';
import Link from 'next/link';
// import SpeechBubble from "@/components/objects/speechBubble/speechBubble";

const Writing: React.FC = () => {
  const [modalShow, setModalShow] = useState(true);

  return (
    <div            
      style={{
      backgroundImage: 'url("images/backGround/brickBackground.jpg")',
      backgroundSize: 'fill',
      height: '100vh', // Ensuring it covers the full viewport height
      width: '100vw',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
  }}>
        
      <DoubleModal
        children1={
          <div className="flex flex-col justify-center items-center text-center">
            <Image
              src="/images/angels/writing.png" 
              alt="Image Description"
              width={150}  
              height={150}
              style={{ opacity: 0 }}
            />
            <Link href="/writing/simpleWriting" passHref>
              <button>단순 생성</button>
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
              style={{ opacity: 1 }}
            />
            <Link href="/writing/complexWriting/events" passHref>
              <button>고급 생성</button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default Writing;