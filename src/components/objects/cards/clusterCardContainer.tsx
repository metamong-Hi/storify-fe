import React, { useState } from 'react';
import ClusterCard from './clusterCard';
import './clusterCardContainer.css';

type CardSize = 'xsmall' | 'small' | 'middle' | 'large' | 'xlarge';

const cardSizes: CardSize[] = ['xsmall', 'small', 'middle', 'large', 'xlarge'];

const ClusterCardContainer = () => {
    const [cardStack, setCardStack] = useState(cardSizes);
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
    
            // Upgrade the size of each remaining card
            const updatedCardStack = cardStack.map((size) => {
                const currentIndex = sizes.indexOf(size);
                if (!newFlyOff.includes(size) && currentIndex < 4) {
                    return sizes[currentIndex + 1];
                }
                return size;
            });
    
            setCardStack(updatedCardStack);
        }
    };

    return (
        <div className="card-container">
            {cardStack.map((size, index) => (
                <ClusterCard
                    key={index}
                    onClick={() => handleCardClick(size)}
                    className={`${size} ${activeCard === size ? 'active' : ''} ${flyOff.includes(size) ? 'fly-off' : ''}`}
                />
            ))}
        </div>
    );
};

export default ClusterCardContainer;
