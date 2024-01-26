"use client"
import React, { useState, CSSProperties } from 'react';
import Image from 'next/image';
import './eraser.css'

// Eraser 컴포넌트의 Props 타입 정의
type EraserProps = {
  // other props
  onClick?: () => void; // Add this line
};
const Eraser: React.FC<EraserProps> = ({ onClick }) => {
    const [isShaking, setIsShaking] = useState(false);
    const dustParticles = 10; // Number of dust particles
  
    const createDust = () => {
        return Array.from({ length: dustParticles }, (_, index) => {
          // Generate random scatter values
          const scatterX = `${(Math.random() - 0.5) * 100}px`;
          const scatterY = `${(Math.random() - 0.5) * 10}px`;
      
          return (
            <div
              key={index}
              className="dust"
              style={{
                animationDelay: `${0.1 * index}s`,
                left: `${50 + (Math.random() - 0.5) * 10}%`, // Slight horizontal variation in starting position
                // Setting the custom properties
                ['--scatterX' as any]: scatterX,
                ['--scatterY' as any]: scatterY,
              }}
            ></div>
          );
        });
      };
  
    const handleEraserClick = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000); // Stop shaking after 1 second
    };
    const combinedOnClick = () => {
      handleEraserClick();
      if (onClick) {
        onClick(); // Call the passed-in onClick function
      }
    };
  
    return (
      <div onClick={combinedOnClick} className={`eraser-container ${isShaking ? 'shake' : ''}`}>
        <Image src="/images/buttons/eraser.png" alt="Eraser" width={50} height={50}/>
        {isShaking && createDust()}
      </div>
    );
  };
  
  export default Eraser;
  
