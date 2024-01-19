import React from 'react';
import Image from 'next/image';

interface SpeechBubbleProps {
  imageSrc: string;
  alt: string;
  overlayText: string;
}
const SpeechBubble: React.FC<SpeechBubbleProps> = ({ imageSrc, alt, overlayText }) => {
    return (
      // Center horizontally and position towards the top
      <div className="flex justify-center items-start h-screen"> 
        <div className="relative w-96 h-96 mt-10"> {/* Adjust margin-top as needed */}
          <Image
            src={imageSrc}
            alt={alt}
            layout="fill"
            objectFit="cover"
            sizes="50vw" // Adjust this value to set an appropriate size
            className="rounded-lg flip-horizontal"
          />
          <p className="absolute top-1/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-2xl">
            {overlayText}
          </p>
        </div>
      </div>
    );
  };

export default SpeechBubble;