import React from 'react';

interface BasicButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BasicButton: React.FC<BasicButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-blue-500 hover:bg-blue-700 text-white font-bold 
        py-2 px-4 rounded-lg border-2 border-blue-700 sm:rounded-md sm:border-2
        md:py-3 md:px-6 md:rounded-xl md:border-4
        lg:py-4 lg:px-8 lg:rounded-2xl lg:border-4
      "
    >
      {children}
    </button>
  );
};

export default BasicButton;