import React from 'react';
import Image from 'next/image';

interface SpeechBubbleProps {
  imageSrc: string;
  alt: string;
  overlayText: string;
}
const SpeechBubble: React.FC<SpeechBubbleProps> = ({ imageSrc, alt, overlayText }) => {
  return (
    <div className="fixed top-1/5 left-2/5 z-50 flex justify-center items-start h-screen" style={{ zIndex: 1000 }}>
      <div className="relative w-64 h-40 sm:w-64 sm:h-40 md:w-80 md:h-52 lg:w-96 lg:h-64  mt-0 ml-0"> {/* 반응형 크기 조정 */}
        <Image
          src={imageSrc}
          alt={alt}
          layout="fill"
          objectFit="cover"
          sizes="28vw"
          className="rounded-lg flip-horizontal"
        />
        <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-2xl">
          {overlayText}
        </p>
      </div>
    </div>
  );
};

export default SpeechBubble;