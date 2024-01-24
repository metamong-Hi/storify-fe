import React, { useState } from 'react';
import ClusterCard from './clusterCard';
import './clusterCardContainer.css';

type CardSize = 'xsmall' | 'small' | 'middle' | 'large' | 'xlarge';

const ClusterCardContainer = () => {
    const [activeCard, setActiveCard] = useState<CardSize | null>(null);
    const [flyOff, setFlyOff] = useState<CardSize[]>([]);

    const handleCardClick = (cardSize: CardSize) => {

        const sizes: CardSize[] = ['xsmall', 'small', 'middle', 'large', 'xlarge'];
        const index = sizes.indexOf(cardSize);
        // Remove the front card and set the new array as the card stack
        if (index === 4) {
            setActiveCard(activeCard === cardSize ? null : cardSize);
        } else {
            const newFlyOff = sizes.slice(index + 1);
            setFlyOff(newFlyOff);
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
