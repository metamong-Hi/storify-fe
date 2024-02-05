// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';



const Intro1: React.FC = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF3E0]">
        <h1 className="text-4xl font-bold">
          어린이를 위한 <span className="text-[#B68973]">AI 동화책</span>
        </h1>

        <p className="mt-3 text-2xl mb-4">
          AI가 여러분의 스토리를 듣고 <span className="font-semibold">동화책을 만들어줍니다.</span>
        </p>

        <>
      <Swiper
      slidesPerView={3}
      spaceBetween={0}
      grabCursor={true}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      effect={'coverflow'}
      pagination={true}
        
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        style={{ width: '100%', height: '40vh' }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} style={{ height: '40vh' }}>
            <Image src={src} alt={`Slide ${index}`} layout="fill" objectFit="cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
        <div className="mt-4">
          <Link href="/allbooks" passHref>
          <button
          className="p-2 text-2xl font-bold cursor-pointer hover:text-[#B68973] border rounded-xl border-[#B68973] opacity-0 bg-[#B68973] hover:bg-transparent text-white transition-all duration-300 ease-in-out transform hover:scale-150 animate-fadeInUp delay-3s text-md sm:text-lg md:text-1xl lg:text-2xl xl:text-3xl textWithShadow"
        >
          동화책 보러 가기
        </button>
          </Link>
        
        </div>
    </div>
  );
};

export default Intro1;
