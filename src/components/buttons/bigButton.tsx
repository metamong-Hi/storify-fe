// components/LargeButton.tsx
import React from 'react';

interface LargeButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const LargeButton: React.FC<LargeButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full border-4 border-green-700 text-lg md:text-xl md:py-4 md:px-8"
    >
      {children}
    </button>
  );
};

export default LargeButton;
