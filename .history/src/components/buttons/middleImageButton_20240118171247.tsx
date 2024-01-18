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
          p-2 border-3 border-purple-700 rounded-md
          sm:p-3 sm:border-4 sm:rounded-lg
          md:p-4 md:border-5 md:rounded-xl
          lg:p-5 lg:border-5 lg:rounded-2xl
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
