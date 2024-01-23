import React, { useState } from 'react';
import ClusterCard from './clusterCard';
import './clusterCardContainer.css';

type CardSize = 'xsmall' | 'small' | 'middle' | 'large' | 'xlarge';

const ClusterCardContainer = () => {
    const [activeCard, setActiveCard] = useState<CardSize | null>(null);
    const [flyOff, setFlyOff] = useState<CardSize[]>([]);

    const handleCardClick = (cardSize: CardSize) => {
        console.log(`Card clicked: ${cardSize}`);
        if (cardSize === 'xlarge') {
            // Reset to original orientation
            setActiveCard(activeCard === cardSize ? null : cardSize);
        } else {
            // Set the current and all smaller cards to fly off
            const sizes: CardSize[] = ['xsmall', 'small', 'middle', 'large', 'xlarge'];
            const index = sizes.indexOf(cardSize);
            setFlyOff(sizes.slice(index + 1));
        }
    };

    return (
        <div className="card-container">
            {(['xsmall', 'small', 'middle', 'large', 'xlarge'] as CardSize[]).map((size, index) => (
                <ClusterCard
                    key={index}
                    className={`${size} ${activeCard === size ? 'active' : ''} ${flyOff.includes(size) ? 'fly-off' : ''}`}
                    onClick={() => handleCardClick(size as CardSize)} // Explicit type assertion
                />
            ))}
        </div>
    );
};

export default ClusterCardContainer;
