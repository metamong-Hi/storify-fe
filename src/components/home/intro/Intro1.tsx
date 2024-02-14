// pages/index.tsx
'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Intro1: React.FC = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
    });
  }, []);

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
      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 font-bold text-base-content" data-aos="fade-up">
        어린이를 위한 <span className="text-[#B68973]">AI 동화책</span>
      </h1>

      <p className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 text-base-content" data-aos="fade-up" data-aos-delay="300">
        모든 동화책을 <span className="font-semibold">무료로</span> 이용 할 수 있습니다.
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
        data-aos="fade-up" 
        data-aos-delay="600"
       
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} style={{ height: '50vh', width :'50vw', position: 'relative' }}>
                <Image src={src} alt={`Slide ${index}`} layout="fill" objectFit="cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
      <div className="mt-4"  data-aos="fade-up" 
        data-aos-delay="900">
        <Link href="/allbooks" passHref>
          <button className="p-1 sm:p-1.5 md:p-2 lg:p-3 xl:p-4 2xl:p-5 font-bold cursor-pointer hover:text-[#B68973] text-Black opacity-0 duration-300 ease-in-out transform hover:scale-150 animate-fadeInUp delay-3s text-md sm:text-lg md:text-1xl lg:text-2xl xl:text-3xl 2xl:tet-4xl textWithShadow">
            동화책 보러 가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro1;
