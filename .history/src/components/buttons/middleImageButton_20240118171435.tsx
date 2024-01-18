import Image from 'next/image';
import React from 'react';

interface MediumImageButtonProps {
  onClick: () => void;
  imageSrc: string;
  alt: string;
}

const MediumImageButton: React.FC<MediumImageButtonProps> = ({ onClick, imageSrc, alt }) => {
    return (
      <button 
        onClick={onClick} 
        className="
          inline-block relative
          p-2 border-4 border-purple-700 rounded-lg
          sm:p-4 sm:border-5 sm:rounded-xl
          md:p-6 md:border-6 md:rounded-2xl
          lg:p-8 lg:border-7 lg:rounded-3xl
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
