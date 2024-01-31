"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import VanillaTilt from 'vanilla-tilt';

interface TiltNode extends HTMLDivElement {
  vanillaTilt?: VanillaTilt;
}

const ComplexCard = () => {

  const tiltRef = useRef<TiltNode>(null);

  useEffect(() => {
    const currentTilt = tiltRef.current;
  
    if (currentTilt) {
      VanillaTilt.init(currentTilt, {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
      });
    }
  
    return () => {
      if (currentTilt && currentTilt.vanillaTilt) {
        currentTilt.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <Link href="/writing/complexWriting" passHref>
      <div ref={tiltRef} className="card w-full sm:w-64 md:w-80 lg:w-96 xl:w-112 2xl:w-144 glass ml-0 sm:ml-2 md:ml-4 lg:ml-6 xl:ml-7 2xl:ml-8 mt-10 cursor-pointer">
        <figure>
          <Image src="https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b3ae00f22246ba2780ccc7-1706274325596-0.png"
            alt="동화 생성 선택" 
            width={400} 
            height={400}
            layout="responsive"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">요정과 함께 쓸래요</h2>
          <p>글쓰기가 어렵다면 요정이 글쓰기를 도와줄 거예요</p>
        </div>
      </div>
    </Link>
  );
};

export default ComplexCard;

