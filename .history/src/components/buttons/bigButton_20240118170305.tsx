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
        py-4 px-8 rounded-2xl border-4 border-blue-700 
        sm:rounded-2xl sm:border-4
        md:py-6 md:px-12 md:rounded-3xl md:border-4
        lg:py-8 lg:px-16 lg:rounded-4xl lg:border-6
      "
    >
      {children}
    </button>
  );
};

export default BigButton;