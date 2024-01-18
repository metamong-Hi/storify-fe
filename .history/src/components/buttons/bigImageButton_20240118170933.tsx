// components/MediumImageButton.tsx
import Image from 'next/image';
import React from 'react';

interface BigImageButtonProps {
  onClick: () => void;
  imageSrc: string;
  alt: string;
}

const BigImageButton: React.FC<BigImageButtonProps> = ({ onClick, imageSrc, alt }) => {
    return (
      <button onClick={onClick} className="border-4 border-purple-700 rounded-2xl p-1.5 inline-block relative">
        <Image 
          src={imageSrc} 
          alt={alt} 
          width={48} // Width of the image in pixels
          height={48} // Height of the image in pixels
          className="rounded-2xl"
        />
      </button>
    );
  };
  
  export default BigImageButton;
  