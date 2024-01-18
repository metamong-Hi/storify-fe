// components/MediumImageButton.tsx
import React from 'react';

interface MediumImageButtonProps {
  onClick: () => void;
  imageSrc: string;
  alt: string;
}

const MediumImageButton: React.FC<MediumImageButtonProps> = ({ onClick, imageSrc, alt }) => {
  return (
    <button onClick={onClick} className="border-4 border-purple-700 rounded-full p-1.5">
      <Imagemg src={imageSrc} alt={alt} className="h-12 w-12 rounded-2xl" />
    </button>
  );
};

export default MediumImageButton;
