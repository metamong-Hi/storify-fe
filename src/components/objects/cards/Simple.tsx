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
        className="card w-64 sm:w-72 md:w-80 lg:w-96 xl:w-112 2xl:w-128 glass cursor-pointer "
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
          <h1 className="card-title text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:tet-5xl mb-0 md:mb-0.5 lg:mb-0.5 xl:mb-1 2xl:mb-1 text-base-content">혼자서 쓸래요</h1>
          <h2 className="text-md md:text-lg lg:text-xl xl:text-2xl 2xl:tet-3xl text-base-content/80">글쓰기에 자신 있다면</h2>
          <h2 className="text-md md:text-lg lg:text-xl xl:text-2xl 2xl:tet-3xl text-base-content/80">혼자서 글을 써 보세요</h2>
        </div>
      </div>
    </Link>
  );
};

export default SimpleCard;
