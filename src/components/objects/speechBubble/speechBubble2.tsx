import React from 'react';
import Image from 'next/image';

interface SpeechBubbleVProps {
  imageSrc: string;
  alt: string;
  overlayText: string;
}

const SpeechBubbleV: React.FC<SpeechBubbleVProps> = ({ imageSrc, alt, overlayText }) => {
  return (
    <div className="relative w-64 h-40 md:w-80 md:h-52 lg:w-96 lg:h-64 rotate-90">
      <Image
        src={imageSrc}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <p className="absolute top-1/2 left-2/5 transform -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] text-black font-bold text-3xl text-center">
        {overlayText}
      </p>
    </div>
  );
};

export default SpeechBubbleV;
