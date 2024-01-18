// components/SmallImageButton.tsx
import React from 'react';

interface SmallImageButtonProps {
  onClick: () => void;
  imageSrc: string;
  alt: string;
}

const SmallImageButton: React.FC<SmallImageButtonProps> = ({ onClick, imageSrc, alt }) => {
  return (
    <button onClick={onClick} className="border-4 border-purple-700 rounded-full p-1">
      <img src={imageSrc} alt={alt} className="h-8 w-8 rounded-3xl" />
    </button>
  );
};

export default SmallImageButton;
