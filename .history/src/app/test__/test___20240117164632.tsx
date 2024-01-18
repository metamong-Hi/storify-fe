// components/ResponsiveComponent.tsx
import React from 'react';

const ResponsiveComponent: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-blue-500 text-white p-6 mb-4 rounded">
        <p className="text-lg md:text-xl lg:text-2xl">Responsive Text Size</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 bg-red-500 text-white p-6 mb-4 md:mb-0 md:mr-4 rounded">
          <p>First Column (Stacks on small screens)</p>
        </div>
        <div className="flex-1 bg-green-500 text-white p-6 rounded">
          <p>Second Column (Stacks on small screens)</p>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveComponent;