// pages/index.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';

const Intro2: React.FC = () => {
  const images = [
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai1-1706699591500.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai2-1706699626175.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai3-1706699643732.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai4-1706699657952.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai5-1706699671535.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai6-1706699685087.jpeg',
    'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai7-1706699697628.jpeg',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        나만을 위한 <span className="text-[#B68973]">추천 동화책</span>
      </h1>

      <p className="mt-3 text-2xl mb-4">
      <span className="font-semibold">장르별, 인기별, 나만의</span> 책장이 있습니다.
      </p>

      <>
        <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} style={{ height: '40vh', width :'40vw', position: 'relative' }}>
                <Image src={src} alt={`Slide ${index}`} layout="fill" objectFit="cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
      <div className="mt-4">
        <Link href="/allbooks" passHref>
          <button className="p-2 text-2xl font-bold cursor-pointer hover:text-[#B68973] border rounded-xl border-[#B68973] opacity-0 bg-[#B68973] hover:bg-transparent text-white transition-all duration-300 ease-in-out transform hover:scale-150 animate-fadeInUp delay-3s text-md sm:text-lg md:text-1xl lg:text-2xl xl:text-3xl textWithShadow">
            동화책 보러 가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro2;
