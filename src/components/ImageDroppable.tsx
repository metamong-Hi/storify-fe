import React,{ReactNode} from 'react';
interface ImageDroppableProps {
  onDrop: (droppedImageUrl: string) => void; 
  children?: ReactNode; 
}

const ImageDroppable: React.FC<ImageDroppableProps> = ({ onDrop, children }) => {
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();


    
    const droppedImageUrl = e.dataTransfer.getData('text/plain');
    onDrop(`data:image/jpeg;base64,${droppedImageUrl}`);
   
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: '100%', height: '100%', borderRadius: '20px' }}
    >
      {children}
    </div>
  );
};

export default ImageDroppable;
