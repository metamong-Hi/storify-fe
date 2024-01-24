// components/BasicBox.tsx
import React from 'react';

interface BorderlessBoxProps {
  children: React.ReactNode;
}

const BorderlessBox: React.FC<BorderlessBoxProps> = ({ children }) => (
  <div className="w-32 h-32 bg-white rounded-lg  flex justify-center items-center
    sm:w-48 sm:h-48 sm:rounded-lg 
    md:w-64 md:h-64 md:rounded-xl 
    lg:w-80 lg:h-80 lg:rounded-2xl ">
    {children}
  </div>
);

export default BorderlessBox;
