// components/ResponsiveModal.tsx
import React, { FC } from 'react';

interface oneModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const oneModal: FC<oneModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg border bg-opacity-70 border-blue-400 shadow-xl overflow-hidden max-w-sm w-full md:max-w-md lg:max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="bg-none p-3 flex justify-between items-center">
          <div>
          </div>
          <h2 className="text-xl text-black font-bold">Fun Story</h2>
          <button onClick={onClose} className="text-black text-2xl">×</button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default oneModal;
