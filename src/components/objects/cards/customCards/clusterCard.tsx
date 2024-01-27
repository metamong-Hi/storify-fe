import React, { useState } from 'react';
import './clusterCard.css';

interface ClusterCardProps {
  className?: string;
  onClick: () => void;
}
const ClusterCard: React.FC<ClusterCardProps> = ({ className, onClick }) => {
  const [isRotated, setIsRotated] = useState(false);

  return (
    <div className={`card ${className ? className : ''}`} onClick={onClick}>
      1
    </div>
  );
};

export default ClusterCard;
