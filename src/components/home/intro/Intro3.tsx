'use client';
import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import AOS from 'aos';
import VanillaTilt from 'vanilla-tilt';
import IntroHeading from './IntroHeading';
import IntroText from './IntroText';
import CardComponent from '@/components/objects/CardComponent';

const Intro3: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const cardInfo = [
    {
      title: '나만의 책장',
      description: '내가 쓴 책들을\n볼 수 있어요',
      imgUrl: '/static/card/card1.jpeg',
    },
    {
      title: '친구의 책장',
      description: '친구를 추가하고, 책장에\n놀러갈 수 있어요',
      imgUrl: '/static/card/card2.jpeg',
    },
    {
      title: '검색/정렬 기능',
      description: '원하는 동화책을\n찾아서 볼 수 있어요',
      imgUrl: '/static/card/card3.jpeg',
    },
    {
      title: '동화책 수정',
      description: '이미지,제목,테마를\n원하는대로 바꿔보세요',
      imgUrl: '/static/card/card4.jpeg',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <IntroHeading>
        스토리파이만의 <span className="text-accent">특별한 서비스</span>
      </IntroHeading>
      <IntroText>다양한 동화책들을 읽고, 써 보세요.</IntroText>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10 mt-5" data-aos="fade-up">
        {cardInfo.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            description={card.description}
            imgUrl={card.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro3;
