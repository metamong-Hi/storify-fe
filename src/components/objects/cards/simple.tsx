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
      <div ref={tiltRef} className="card w-full sm:w-48 md:w-64 lg:w-80 xl:w-96 2xl:w-128 glass mr-0 sm:mr-1 md:mr-2 lg:mr-3 xl:mr-4 2xl:mr-6 mt-10 cursor-pointer ">
        <figure>
          <Image src="https://s3.ap-northeast-2.amazonaws.com/storify/public/solowriting-1706712930779.jpeg"
            alt="동화 생성 선택" 
            width={4000} 
            height={4000}
            layout="responsive"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h1 className="card-title text-2xl mb-1">혼자서 쓸래요</h1>
          <h2 className="text-xl text-gray-500" >글쓰기에 자신 있다면</h2>
          <h2 className="text-xl text-gray-500" >혼자서 글을 써 보세요</h2>
        </div>
      </div>
    </Link>
  );
};

export default SimpleCard;

