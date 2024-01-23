import React, { useState } from 'react';
import './clusterCard.css';

interface ClusterCardProps {
    className?: string;
    size?: string;
    onClick: () => void;
}
const ClusterCard: React.FC<ClusterCardProps & { onFlyOffEnd: () => void }> = ({
    className,
    size,
    onClick,
    onFlyOffEnd,
}) => {
    const [isRotated, setIsRotated] = useState(false);
    const handleAnimationEnd = (event: { animationName: string }) => {
        if (event.animationName === 'flyOff') {
            onFlyOffEnd();
        }
    };
    return (
        <div
            className={`card ${className ? className : ''}`}
            onClick={onClick}
            onAnimationEnd={handleAnimationEnd}
        >
            1
        </div>
    );
};

export default ClusterCard;
