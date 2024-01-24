import React, { useState } from 'react';
import Image from 'next/image';
import './card.css'; 

interface CardProps {
  imageSrc: string;
  title: string;
  text: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, text, buttonText, onButtonClick }) => {
  const [tiltValues, setTiltValues] = useState({ rotateX: 0, rotateY: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = -(x - rect.width / 2) / rect.width * 30; // Increased tilt effect
    const rotateX = -(rect.height / 2 - y) / rect.height * 30; // Increased tilt effect

    setTiltValues({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTiltValues({ rotateX: 0, rotateY: 0 });
  
  };

  const handleCardClick = () => {
    setIsZoomed((prevIsZoomed) => !prevIsZoomed);
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  return (
    <div
      className={`card-container ${isZoomed ? 'zoomed' : ''} ${isClicked ? 'clicked' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        transform: `perspective(600px) rotateX(${tiltValues.rotateX}deg) rotateY(${tiltValues.rotateY}deg) scale(${isZoomed ? 1.2 : 1}) rotateY(${isClicked ? 360 : 0}deg)`,
      }}
    >
      <Image 
        src={imageSrc} 
        alt={title} 
        width="400"
        height="300"
        className="w-full" 
        layout="responsive"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {text}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button onClick={onButtonClick} className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
