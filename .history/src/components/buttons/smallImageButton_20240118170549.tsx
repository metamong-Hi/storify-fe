// components/ImageButton.tsx
import React from 'react';

interface ImageButtonProps {
  onClick: () => void;
  imageSrc: string;
  alt: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ onClick, imageSrc, alt }) => {
  return (
    <button onClick={onClick} className="border-4 border-purple-700 rounded-full p-1 md:p-2">
      <img src={imageSrc} alt={alt} className="rounded-xl" />
    </button>
  );
};

export default ImageButton;
