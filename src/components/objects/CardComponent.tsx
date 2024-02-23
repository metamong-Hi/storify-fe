'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VanillaTilt from 'vanilla-tilt';

interface CardProps {
  title: string;
  description: string;
  imgUrl: string;
  link?: string;
}

interface TiltNode extends HTMLDivElement {
  vanillaTilt?: VanillaTilt;
}

const CardComponent: React.FC<CardProps> = ({ title, description, imgUrl, link  }) => {
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

  const cardContent = (
    <div
    ref={tiltRef}
    className="card w-64 sm:w-72 md:w-80 lg:w-96 xl:w-112 2xl:w-128 glass cursor-pointer shadow-xl"
  >
    <figure className="relative w-full h-full">
      <Image src={imgUrl}
      alt={title}
      width={512}
      height={512}
      quality={100}
      style={{objectFit: "cover"}}/>
    </figure>
    <div className="card-body items-center text-center">
      <h3 className="card-title text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:tet-5xl mb-0 md:mb-0.5 xl:mb-1 text-base-content">{title}</h3>
      <p className="text-md md:text-lg lg:text-xl xl:text-2xl 2xl:tet-3xl text-base-content/70" style={{ whiteSpace: 'pre-line' }}>
        {description}
      </p>
    </div>
  </div>

  );

  return link ? (
    <Link href={link} passHref>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};


export default CardComponent;
