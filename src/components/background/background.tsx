"use client"
// ColorfulBackground.tsx
import React from 'react';

const ColorfulBackground: React.FC = () => {
  return (
    <div className="w-screen min-h-screen z-10">
      <div className="h-1/6 w-full bg-pastelRed"></div>
      <div className="h-1/6 w-full bg-pastelOrange"></div>
      <div className="h-1/6 w-full bg-pastelYellow"></div>
      <div className="h-1/6 w-full bg-pastelGreen"></div>
      <div className="h-1/6 w-full bg-pastelBlue"></div>
      <div className="h-1/6 w-full bg-pastelPurple"></div>
    </div>
  );
}

export default ColorfulBackground;
