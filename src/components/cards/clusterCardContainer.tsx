import React, { useState, useEffect } from 'react';
import ClusterCard from './clusterCard';
import './clusterCardContainer.css';

type CardSize = 'xsmall' | 'small' | 'middle' | 'large' | 'xlarge';

// 카드 크기를 정의합니다. 가장 작은 크기부터 시작합니다.
const cardSizes: CardSize[] = ['xsmall', 'small', 'middle', 'large', 'xlarge'];

const ClusterCardContainer = () => {
    // 각 카드의 현재 상태를 배열로 관리합니다.
    const [cards, setCards] = useState<CardSize[]>(cardSizes);
    // 사라져야 할 카드를 상태로 관리합니다.
    const [disappearCard, setDisappearCard] = useState<CardSize | null>(null);

    // 사라질 카드가 변경될 때마다 호출됩니다.
    useEffect(() => {
        if (disappearCard) {
            // 사라지는 카드를 배열에서 제거합니다.
            setCards((currentCards) => currentCards.filter((card) => card !== disappearCard));
        }
    }, [disappearCard]);

    const handleCardClick = (cardSize: CardSize) => {
        console.log(`Card clicked: ${cardSize}`);
        // xlarge 카드를 클릭하면 상태를 변경하여 사라지게 합니다.
        if (cardSize === 'xlarge') {
            setDisappearCard(cardSize);
        } else {
            // 다른 카드를 클릭하면, 그 카드를 다음 크기로 만듭니다.
            // 예를 들어 'large' 카드를 클릭하면 'xlarge'가 됩니다.
            setCards((currentCards) => {
                const index = currentCards.indexOf(cardSize);
                const newCards = [...currentCards];
                if (index >= 0 && index < cardSizes.length - 1) {
                    // 현재 클릭한 카드를 제거하고, 다음 크기로 변경합니다.
                    newCards.splice(index, 2, cardSizes[index + 1]);
                }
                return newCards;
            });
        }
    };

    return (
        <div className="card-container">
            {cards.map((size, index) => (
                <ClusterCard
                    key={size}
                    size={size}
                    onClick={() => handleCardClick(size)}
                    // 사라지는 카드에 특별한 클래스를 추가합니다.
                    className={size === disappearCard ? 'fly-off' : ''}
                />
            ))}
        </div>
    );
};

export default ClusterCardContainer;
