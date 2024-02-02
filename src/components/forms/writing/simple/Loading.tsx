// LoadingPage.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

interface LoadingPageProps {
  loadingTexts: string[];
}

const LoadingPage: React.FC<LoadingPageProps> = ({ loadingTexts }) => (
  <Swiper
    modules={[Autoplay]}
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
  >
    {loadingTexts.map((text, index) => (
      <SwiperSlide key={index}>{text}</SwiperSlide>
    ))}
  </Swiper>
);

export default LoadingPage;
