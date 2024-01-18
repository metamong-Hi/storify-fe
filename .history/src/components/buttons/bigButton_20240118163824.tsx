import React from 'react';

interface BigButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BigButton: React.FC<BigButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-blue-500 hover:bg-blue-700 text-white font-bold 
        py-2 px-4 rounded-lg border-2 border-blue-700 sm:rounded-lg sm:border-2
        md:py-3 md:px-6 md:rounded-xl md:border-3
        lg:py-4 lg:px-8 lg:rounded-2xl lg:border-4
      "
    >
      {children}
    </button>
  );
};

export default BigButton;