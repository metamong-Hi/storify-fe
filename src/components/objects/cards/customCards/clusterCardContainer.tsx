import React, { useState } from 'react';
import ClusterCard from './clusterCard';
import './clusterCardContainer.css';

type CardSize = 'xsmall' | 'small' | 'middle' | 'large' | 'xlarge';

const ClusterCardContainer = () => {
    const [activeCard, setActiveCard] = useState<CardSize | null>(null);
    const [flyOff, setFlyOff] = useState<CardSize[]>([]);
    const [cardStack, setCardStack] = useState<CardSize[]>(['xsmall', 'small', 'middle', 'large', 'xlarge']); // Add this line

    const handleCardClick = (cardSize: CardSize) => {
        const sizes: CardSize[] = ['xsmall', 'small', 'middle', 'large', 'xlarge'];
        const index = sizes.indexOf(cardSize);
    
        if (index === 4) {
            setActiveCard(activeCard === cardSize ? null : cardSize);
        } else {
            const largerCards = sizes.slice(index + 1).reverse();
            // Stagger the fly-off effect for each card
            largerCards.forEach((size, idx) => {
                setTimeout(() => {
                    setFlyOff((prevFlyOff) => [...prevFlyOff, size]);
                }, idx * 500); // Stagger by 300ms, adjust as needed
            });
    
            // Delay the removal of flown off cards and increment of remaining cards
            setTimeout(() => {
                const numCardsFlownOff = largerCards.length;
                const updatedCardStack = cardStack
                    .filter(size => !largerCards.includes(size))
                    .map(size => {
                        let currentIndex = sizes.indexOf(size);
                        let newIndex = currentIndex + numCardsFlownOff;
                        return newIndex < sizes.length ? sizes[newIndex] : size;
                    });
    
                setCardStack(updatedCardStack);
                setFlyOff([]); // Clear the flyOff state
            }, largerCards.length * 500); // Adjust this timeout to match the total staggered fly-off duration
        }
    };
    
    

    return (
        <div className="card-container">
            {cardStack.map((size, index) => ( // Use cardStack here
                <ClusterCard
                    key={index}
                    className={`${size} ${activeCard === size ? 'active' : ''} ${flyOff.includes(size) ? 'fly-off' : ''}`}
                    onClick={() => handleCardClick(size as CardSize)}
                />
            ))}
        </div>
    );
};

export default ClusterCardContainer;
