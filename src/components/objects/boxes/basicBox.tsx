// components/BasicBox.tsx
import React from 'react';

interface BasicBoxProps {
  children: React.ReactNode;
}

const BasicBox: React.FC<BasicBoxProps> = ({ children }) => (
  <div className="w-32 h-32 bg-white border-2 border-blue-500  rounded-lg  flex justify-center items-center
    sm:w-48 sm:h-48 sm:rounded-lg sm:border-4
    md:w-64 md:h-64 md:rounded-xl md:border-8
    lg:w-80 lg:h-80 lg:rounded-2xl lg:border-12">
    {children}
  </div>
);

export default BasicBox;
