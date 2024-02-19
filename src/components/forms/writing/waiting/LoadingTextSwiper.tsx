import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const loadingTexts: string[] = [
  '와, 멋진 글이네요!',
  '요정에게 글을 보낼게요.',
  '글이 요정에게 전달되고 있어요.',
  '요정이 글을 받았어요.',
  '요정이 글을 읽고 있어요.',
  '요정이 어떤 동화로 바꿀 지 생각하고 있어요.',
  '곧 요정이 동화를 써 줄 거예요.',
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
        <h1 className="text-xl text-center font-bold text-base-content">
          {loadingText}
        </h1>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default LoadingTextSwiper;
