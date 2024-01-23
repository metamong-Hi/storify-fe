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
        // Remove the front card and set the new array as the card stack
        if (cardSize === 'xlarge') {
            // Reset to original orientation
            setActiveCard(activeCard === cardSize ? null : cardSize);
        } else {
            // Set the current and all smaller cards to fly off
            // const sizes: CardSize[] = ['xsmall', 'small', 'middle', 'large', 'xlarge'];
            // const index = sizes.indexOf(cardSize);
            // setFlyOff(sizes.slice(index + 1));
            setCardStack((prevStack) => prevStack.slice(1));
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

// ClusterCard component here...
