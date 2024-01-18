// components/ResponsiveModal.tsx
import React, { FC } from 'react';

interface ResponsiveModalProps {
  show: boolean;
  onClose: () => void;
}

const ResponsiveModal: FC<ResponsiveModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black">
            ×
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveModal;
