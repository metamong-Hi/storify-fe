'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import AOS from 'aos';
import VanillaTilt from 'vanilla-tilt';

interface TiltNode extends HTMLDivElement {
  vanillaTilt?: VanillaTilt;
}

const Intro3: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const tiltRef = useRef<TiltNode>(null);

  useEffect(() => {
    const currentTilt = tiltRef.current;

    if (currentTilt) {
      VanillaTilt.init(currentTilt, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }

    return () => {
      if (currentTilt && currentTilt.vanillaTilt) {
        currentTilt.vanillaTilt.destroy();
      }
    };
  }, []);

  const applyTiltEffect = (node: HTMLElement) => {
    if (node) {
      VanillaTilt.init(node, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }
  };

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
      title: '그림체 선택',
      description: '카툰/지브리/색연필\n원하는대로 그려보세요',
      imgUrl:
        'https://s3.ap-northeast-2.amazonaws.com/storify/public/55EC9FF649B29F79F3040C7F9F491CA673361815536DB9B6CFCC7953125865F8 (1)-1707132340249.jpeg',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h3
        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 font-bold text-base-content"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        스토리파이만의 <span className="text-accent">부가서비스</span>
      </h3>
      <p
        className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 text-base-content"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        다양한 동화책들을 읽고, 써 보세요.
      </p>
      <div className="grid grid-cols-2 grid-rows-2 gap-10 mb-10" data-aos="fade-up">
        {cardInfo.map((card, index) => (
          <div
            key={index}
            ref={(node) => node && applyTiltEffect(node)}
            className="card w-full sm:w-52 md:w-60 lg:w-80 xl:w-96 2xl:w-112 glass shadow-xl"
            data-aos="fade-up"
            data-aos-delay={`${index < 2 ? '200' : '300'}`}
          >
            <figure>
              <Image
                src={card.imgUrl}
                alt={card.title}
                width={500}
                height={500}
                layout="responsive"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h4 className="card-title text-lg md:text-1xl lg:text-2xl xl:text-3xl 2xl:tet-4xl mb-0 sm:mb-0 md:mb-0.5 lg:mb-0.5 xl:mb-1 2xl:mb-1 text-base-content">
                {card.title}
              </h4>
              <h5
                className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-base-content/80"
                style={{ whiteSpace: 'pre-line' }}
              >
                {card.description}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intro3;
