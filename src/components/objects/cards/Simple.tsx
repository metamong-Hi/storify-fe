'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
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
    <Link href="/writing/simple" passHref>
      <div
        ref={tiltRef}
        className="card w-44 sm:w-52 md:w-60 lg:w-80 xl:w-96 2xl:w-112 glass mr-1 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5 2xl:mr-6 mt-10 cursor-pointer "
      >
        <figure>
          <Image
            src="https://s3.ap-northeast-2.amazonaws.com/storify/public/solowriting-1706712930779.jpeg"
            alt="동화 생성 선택"
            width={500}
            height={500}
            layout="responsive"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h1 className="card-title text-md sm:text-lg md:text-1xl lg:text-2xl xl:text-3xl 2xl:tet-4xl mb-0 sm:mb-0 md:mb-0.5 lg:mb-0.5 xl:mb-1 2xl:mb-1">혼자서 쓸래요</h1>
          <h2 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:tet-2xl text-gray-500">글쓰기에 자신 있다면</h2>
          <h2 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:tet-2xl text-gray-500">혼자서 글을 써 보세요</h2>
        </div>
      </div>
    </Link>
  );
};

export default SimpleCard;
