import Image from 'next/image';
import React from 'react';

interface MediumImageButtonProps {

  imageSrc: string;
  alt: string;
  onClick?: () => void; 
}

const MediumImageButton: React.FC<MediumImageButtonProps> = ({  imageSrc, alt, onClick }) => {
    return (
      <button 
        className="
          inline-block relative
          p-2 
          sm:p-4 
          md:p-6 
          lg:p-8 
        "
        onClick={onClick}
      >
        <Image 
          src={imageSrc} 
          alt={alt} 
          layout="fill"
          objectFit="contain" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </button>
    );
  };
  
export default MediumImageButton;
