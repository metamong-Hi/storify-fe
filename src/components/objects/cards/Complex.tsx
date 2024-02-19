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
        className="card w-64 sm:w-72 md:w-80 lg:w-96 xl:w-112 2xl:w-128 glass cursor-pointer shadow-xl"
      >
        <figure>
          <Image
            src="https://s3.ap-northeast-2.amazonaws.com/storify/public/fairywriting-1706712965583.jpeg"
            alt="요정과 함께 쓸래요"
            width={256}
            height={256}
            layout="responsive"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h3 className="card-title text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:tet-5xl mb-0 md:mb-0.5 xl:mb-1 text-base-content">요정과 쓸래요</h3>
          <p className="text-md md:text-lg lg:text-xl xl:text-2xl 2xl:tet-3xl text-base-content/80">글쓰기가 어렵다면</p>
          <p className="text-md md:text-lg lg:text-xl xl:text-2xl 2xl:tet-3xl text-base-content/80">요정이 도와줄 거예요</p>
        </div>
      </div>
    </Link>
  );
};

export default ComplexCard;
