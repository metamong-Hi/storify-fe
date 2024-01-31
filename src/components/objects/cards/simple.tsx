"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import VanillaTilt from 'vanilla-tilt';

interface TiltNode extends HTMLDivElement {
  vanillaTilt?: VanillaTilt;
}

const SimpleCard = () => {

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
    <Link href="/writing/simpleWriting" passHref>
      <div ref={tiltRef} className="card w-full sm:w-64 md:w-80 lg:w-96 xl:w-112 2xl:w-144 glass mr-0 sm:mr-2 md:mr-4 lg:mr-6 xl:mr-7 2xl:mr-8 mt-10 cursor-pointer ">
        <figure>
          <Image src="https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b38a5ae074aed077d12d0b-1706265201395-0.png"
            alt="동화 생성 선택" 
            width={400} 
            height={400}
            layout="responsive"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h1 className="card-title">혼자서 쓸래요</h1>
          <h2>글쓰기에 자신 있다면 혼자서 글을 써 보세요</h2>
        </div>
      </div>
    </Link>
  );
};

export default SimpleCard;

