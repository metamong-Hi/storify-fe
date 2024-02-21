import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ImageSwiperProps {
  images: string[];
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ images }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper relative z-0 w-full h-full"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <Image src={src} 
          alt={`Slide ${index}`} 
          width={4800}
          height={3300}
          priority={true}  />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;