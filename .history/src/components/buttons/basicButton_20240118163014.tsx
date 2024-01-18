// components/BasicButton.tsx
import React from 'react';

interface BasicButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BasicButton: React.FC<BasicButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm border-4 border-blue-700 md:py-3 md:px-6"
    >
      {children}
    </button>
  );
};

export default BasicButton;
