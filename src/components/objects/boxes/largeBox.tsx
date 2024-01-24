// components/BasicBox.tsx
import React from 'react';

interface LargeBoxProps {
  children: React.ReactNode;
}

const LargeBox: React.FC<LargeBoxProps> = ({ children }) => (
  <div className="w-48 h-48 bg-white border-4 border-blue-500  rounded-xl  flex justify-center items-center
    sm:w-64 sm:h-64 sm:rounded-xl sm:border-8
    md:w-80 md:h-80 md:rounded-2xl md:border-12
    lg:w-96 lg:h-96 lg:rounded-3xl lg:border-24">
    {children}
  </div>
);

export default LargeBox;
