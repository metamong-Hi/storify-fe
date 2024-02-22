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
      imgUrl:
        'https://s3.ap-northeast-2.amazonaws.com/storify/public/26711DA2DC7BB847578829316E57DDB93B822821245BE373E2FFC1BA21215396-1707131253249.jpeg',
    },
    {
      title: '친구의 책장',
      description: '친구를 추가하고, 책장에\n놀러갈 수 있어요',
      imgUrl:
        'https://s3.ap-northeast-2.amazonaws.com/storify/public/209D50BC563844DA6BA1B0A01D63A0CA8470596F44D08C302D08B0A37EDD6F09-1707131298490.jpeg',
    },
    {
      title: '검색/정렬 기능',
      description: '원하는 동화책을\n찾아서 볼 수 있어요',
      imgUrl:
        'https://s3.ap-northeast-2.amazonaws.com/storify/public/BABCCF72A395AAD2652B8FC666F5014F48C0B9CC9735BD61B4577E9332335462 (1)-1707132423885.jpeg',
    },
    {
      title: '동화책 수정',
      description: '이미지,제목,테마를\n원하는대로 바꿔보세요',
      imgUrl:
        'https://s3.ap-northeast-2.amazonaws.com/storify/public/0E07F78F03B1954936EC89A6061665DDAF6C291EFFC62D43058A54F81ECD276C (1)-1708592430988.jpeg',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <IntroHeading>스토리파이만의 <span className="text-accent">특별한 서비스</span></IntroHeading>
      <IntroText>다양한 동화책들을 읽고, 써 보세요.</IntroText>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10 mt-5" data-aos="fade-up">
        {cardInfo.map((card, index) => (
          <CardComponent key={index} title={card.title} description={card.description} imgUrl={card.imgUrl} />
        ))}
      </div>
    </div>
  );
};

export default Intro3;
