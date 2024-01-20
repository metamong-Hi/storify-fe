import Image from 'next/image';
import React from 'react';

interface MediumImageButtonProps {

  imageSrc: string;
  alt: string;
}

const MediumImageButton: React.FC<MediumImageButtonProps> = ({  imageSrc, alt }) => {
    return (
      <button 
        className="
          inline-block relative
          p-2 
          sm:p-4 
          md:p-6 
          lg:p-8 
        "
      >
        <Image 
          src={imageSrc} 
          alt={alt} 
          layout="fill"
          objectFit="contain" 
        />
      </button>
    );
  };
  
export default MediumImageButton;
