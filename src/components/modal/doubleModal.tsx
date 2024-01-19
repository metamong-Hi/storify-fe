
import React, { FC } from 'react';

interface doubleModalProps {
  show: boolean;
  onClose: () => void;
  children1: React.ReactNode;
  children2: React.ReactNode;
}

const doubleModal: FC<doubleModalProps> = ({ show, onClose, children1, children2 }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4" onClick={onClose}>
      <div className="flex w-full max-w-3xl"> {/* Adjust maximum width as needed */}
        {/* First Modal */}
        <div className="flex-1 bg-white rounded-lg rounded-tr-none rounded-br-none border bg-opacity-80 border-black-400 shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="p-4">
            {children1}
          </div>
        </div>
        {/* Second Modal */}
        <div className="flex-1 bg-white rounded-lg rounded-tl-none rounded-bl-none border bg-opacity-80 border-black-400 shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="p-4">
            {children2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default doubleModal;

