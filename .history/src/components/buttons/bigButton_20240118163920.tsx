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
        py-3 px-6 rounded-lg border-3 border-blue-700 sm:rounded-lg sm:border-2
        md:py-4 md:px-8 md:rounded-xl md:border-3
        lg:py-5 lg:px-10 lg:rounded-2xl lg:border-4
      "
    >
      {children}
    </button>
  );
};

export default BigButton;