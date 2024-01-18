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
      <div className="flex justify-center items-center space-x-4">
        <div className="bg-white rounded-lg rounded-tr-none rounded-br-none border bg-opacity-80 border-black-400 shadow-xl overflow-hidden w-full max-w-md" onClick={e => e.stopPropagation()}>
          <div className="bg-none p-3 flex justify-between items-center">
            <div></div>
            <h2 className="text-xl text-black font-bold">재미있는 이야기 1</h2>
            <div></div>
          </div>
          <div className="p-4">
            {children1}
          </div>
        </div>
        <div className="bg-white rounded-lg rounded-tl-none rounded-bl-none border bg-opacity-80 border-black-400 shadow-xl overflow-hidden w-full max-w-md" onClick={e => e.stopPropagation()}>
          <div className="bg-none p-3 flex justify-between items-center">
            <div></div>
            <h2 className="text-xl text-black font-bold">재미있는 이야기 2</h2>
            <button onClick={onClose} className="text-black text-2xl">×</button>
          </div>
          <div className="p-4">
            {children2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default doubleModal;

