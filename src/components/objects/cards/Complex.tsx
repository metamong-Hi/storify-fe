'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
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
        'max-glare': 0.5,
      });
    }

    return () => {
      if (currentTilt && currentTilt.vanillaTilt) {
        currentTilt.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <Link href="/writing/complex" passHref>
      <div
        ref={tiltRef}
        className="card w-44 sm:w-52 md:w-60 lg:w-80 xl:w-96 2xl:w-112 glass ml-1 sm:ml-2 md:ml-3 lg:ml-4 xl:ml-5 2xl:ml-6 mt-10 cursor-pointer"
      >
        <figure>
          <Image
            src="https://s3.ap-northeast-2.amazonaws.com/storify/public/fairywriting-1706712965583.jpeg"
            alt="동화 생성 선택"
            width={500}
            height={500}
            layout="responsive"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-md sm:text-lg md:text-1xl lg:text-2xl xl:text-3xl 2xl:tet-4xl mb-0 sm:mb-0 md:mb-0.5 lg:mb-0.5 xl:mb-1 2xl:mb-1">요정과 쓸래요</h2>
          <p className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:tet-2xl text-gray-500">글쓰기가 어렵다면</p>
          <p className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:tet-2xl text-gray-500">요정이 도와줄 거예요</p>
        </div>
      </div>
    </Link>
  );
};

export default ComplexCard;
