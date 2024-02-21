import React from 'react';
import CardComponent from '@/components/objects/CardComponent';

const cardInfo = [
  {
    title: '혼자서 쓸래요',
    description: '글쓰기에 자신 있다면\n혼자서 글을 써 보세요',
    imgUrl: 'https://s3.ap-northeast-2.amazonaws.com/storify/public/solowriting-1706712930779.jpeg',
    link: '/writing/simple',
  },
  {
    title: '요정과 쓸래요',
    description: '글쓰기가 어렵다면\n요정이 도와줄 거예요',
    imgUrl:
      'https://s3.ap-northeast-2.amazonaws.com/storify/public/fairywriting-1706712965583.jpeg',
    link: '/writing/complex',
  },
];

const WritingPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      {cardInfo.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            description={card.description}
            imgUrl={card.imgUrl}
            link={card.link} 
          />
      ))}
    </div>
  );
};

export default WritingPage;
