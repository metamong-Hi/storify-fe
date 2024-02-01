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
    <Link href="/writing/complexWriting" passHref>
      <div
        ref={tiltRef}
        className="card w-full sm:w-48 md:w-64 lg:w-80 xl:w-96 2xl:w-128 glass ml-0 sm:ml-1 md:ml-2 lg:ml-3 xl:ml-4 2xl:ml-6 mt-10 cursor-pointer"
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
          <h2 className="card-title text-2xl mb-1">요정과 함께 쓸래요</h2>
          <p className="text-xl text-gray-500">글쓰기가 어렵다면</p>
          <p className="text-xl text-gray-500">요정이 글쓰기를 도와줄 거예요</p>
        </div>
      </div>
    </Link>
  );
};

export default ComplexCard;
