import React from 'react';
import Image from 'next/image';

interface SpeechBubbleProps {
  imageSrc: string;
  alt: string;
  overlayText: string;
}
const SpeechBubble: React.FC<SpeechBubbleProps> = ({ imageSrc, alt, overlayText }) => {
    return (
      <div className="relative w-96 h-96">
        <Image
          src={imageSrc}
          alt={alt}
          layout="fill"
          objectFit="cover"
          sizes="50vw" // 이 값을 조정하여 적절한 사이즈를 설정하세요
          className="rounded-lg flip-horizontal"
        />
        <p className="absolute top-1/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-2xl">
          {overlayText}
        </p>
      </div>
    );
  };
  

export default SpeechBubble;