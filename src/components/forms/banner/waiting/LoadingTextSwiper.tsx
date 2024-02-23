import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const loadingTexts: string[] = [
  '잠시만 기다려 주세요.',
  '의견을 전달하고 있어요',
  '의견을 보내주셔서 감사합니다.',
  '피드백이 잘 도착했습니다.',
  '바로 반영하도록 하겠습니다.',
  '더 나은 서비스로 보답하겠습니다.',
];

const LoadingTextSwiper: React.FC = () => (
  <Swiper
    spaceBetween={0}
    centeredSlides={true}
    loop={true}
    direction="vertical"
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    modules={[Autoplay]}
    className="mySwiper"
    style={{ width: '100%', height: '40%' }}
  >
    {loadingTexts.map((loadingText, index) => (
      <SwiperSlide key={index}>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center font-bold text-base-content">
          {loadingText}
        </h1>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default LoadingTextSwiper;
