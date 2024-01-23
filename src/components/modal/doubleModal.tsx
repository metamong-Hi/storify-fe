
import React, { FC } from 'react';

interface doubleModalProps {
  children1: React.ReactNode;
  children2: React.ReactNode;
}

const doubleModal: FC<doubleModalProps> = ({ children1, children2 }) => {

  return (
    <div className="fixed inset-0 overflow-y-auto h-full w-full flex justify-center items-center p-4">
      <div className="flex w-full max-w-6xl">

        <div className="flex-1 bg-white rounded-4xl  border bg-opacity-80 border-black-400 shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="p-4">
            {children1}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-4xl  border bg-opacity-80 border-black-400 shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="p-4">
            {children2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default doubleModal;

