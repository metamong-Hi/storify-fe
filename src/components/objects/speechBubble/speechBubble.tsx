import React from 'react';
import Image from 'next/image';

interface SpeechBubbleProps {
  imageSrc: string;
  alt: string;
  overlayText: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ imageSrc, alt, overlayText }) => {
  return (
    <div className="relative w-64 h-40 md:w-80 md:h-52 lg:w-96 lg:h-64">
      <Image
        src={imageSrc}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <p className="absolute top-1/2 left-2/5 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-3xl text-center">
        {overlayText}
      </p>
    </div>
  );
};

export default SpeechBubble;
