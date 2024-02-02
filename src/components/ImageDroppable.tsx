import React from 'react';

const ImageDroppable = ({ onDrop, children }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImageUrl = e.dataTransfer.getData('text/plain');
    onDrop(droppedImageUrl);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: '100%', height: '100%', border: '2px dashed #ddd', borderRadius: '20px' }}
    >
      {children}
    </div>
  );
};

export default ImageDroppable;
