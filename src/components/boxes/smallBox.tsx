// components/BasicBox.tsx
import React from 'react';

interface SmallBoxProps {
  children: React.ReactNode;
}

const SmallBox: React.FC<SmallBoxProps> = ({ children }) => (
  <div className="w-16 h-16 bg-white border-2 border-blue-500  rounded-lg  flex justify-center items-center
    sm:w-24 sm:h-24 sm:rounded-lg sm:border-2
    md:w-32 md:h-32 md:rounded-xl md:border-4
    lg:w-40 lg:h-40 lg:rounded-2xl lg:border-6">
    {children}
  </div>
);

export default SmallBox;
