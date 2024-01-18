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
        py-3 px-6 rounded-xl sm:border-3 border-blue-700 sm:rounded-xl sm:border-3
        md:py-4 md:px-8 md:rounded-2xl md:border-4
        lg:py-5 lg:px-10 lg:rounded-3xl lg:border-5
      "
    >
      {children}
    </button>
  );
};

export default BigButton;