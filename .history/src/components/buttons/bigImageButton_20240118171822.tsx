import Image from 'next/image';
import React from 'react';

interface MediumImageButtonProps {
  onClick: () => void;
  imageSrc: string;
  alt: string;
}

const LargeImageButton: React.FC<LargeImageButtonProps> = ({ onClick, imageSrc, alt }) => {
    return (
      <button 
        onClick={onClick} 
        className="
          inline-block relative
          p-3 border-6 border-purple-700 rounded-xl
          sm:p-6 sm:border-7 sm:rounded-2xl
          md:p-9 md:border-8 md:rounded-3xl
          lg:p-12 lg:border-9 lg:rounded-4xl
        "
      >
        <Image 
          src={imageSrc} 
          alt={alt} 
          width={48} // Adjust as needed
          height={48} // Adjust as needed
          className="rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
        />
      </button>
    );
  };
  
export default MediumImageButton;