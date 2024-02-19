'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'aos/dist/aos.css';
import AOS from 'aos';

const HomeDesign: React.FC = () => {

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false); 

  useEffect(() => {
    const token=sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleStoryButtonClick = () => {
    if (isLoggedIn) {
      window.location.href = '/writing';
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); 
    }
  };

  return (
    <div className="relative w-full h-full">
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
        className="mySwiper relative z-0"
        style={{ width: '100%', height: '100vh' }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className= "relative z-0" style={{ height: '100vh' }}>
            <Image src={src} className= "relative z-0" alt={`Slide ${index}`} layout="fill" objectFit="cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      {showToast && (
        <div className="toast toast-start flex items-center text-center w-96 z-50" >
          <div className="alert alert-error ">
            <span>로그인이 필요한 기능입니다.</span>
          </div>
        </div>
      )}
      <div className="absolute top-[10%] left-[6%] z-10">
        <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6 2xl:mb-8 font-bold">
          <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 textWithShadow" data-aos="fade-up">
            여러분이 주인공인
          </h1>
          <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl textWithShadow" data-aos="fade-up" data-aos-delay="300">
            동화 세계가 펼쳐집니다!
          </h1>
        </div>
        <div className="mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5">
          <h2 className="text-gray-200 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-0 sm:mb-0.5 md:mb-1 lg:mb-2 xl:mb-3 2xl:mb-4 textWithShadow" data-aos="fade-up" data-aos-delay="600">
            이야기를 흥미진진한 동화책으로
          </h2>
          <h2 className="text-gray-200 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-0 sm:mb-0.5 md:mb-1 lg:mb-2 xl:mb-3 2xl:mb-4 textWithShadow" data-aos="fade-up" data-aos-delay="900">
            생생한 그림으로 살아나게 해줄 거예요
          </h2>
        </div>
        <button
          className="p-1 border-2 rounded-lg border-white sm:p-1.5 md:p-2 lg:p-3 xl:p-4 2xl:p-5 font-bold cursor-pointer hover:text-black hover:border-black text-white opacity-0 duration-300 ease-in-out transform sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:tet-4xl textWithShadow"
          data-aos="fade-up" data-aos-delay="1200"
          onClick={handleStoryButtonClick}
        >
          동화 만들기
        </button>
      </div>
    </div>
  );
};

export default HomeDesign;
