"use client"
import React, { useState,useEffect} from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HomeDesign: React.FC = () => {
  const images = [
    "https://s3.ap-northeast-2.amazonaws.com/storify/public/ai1-1706699591500.jpeg",
    "https://s3.ap-northeast-2.amazonaws.com/storify/public/ai2-1706699626175.jpeg",
    "https://s3.ap-northeast-2.amazonaws.com/storify/public/ai3-1706699643732.jpeg",
    "https://s3.ap-northeast-2.amazonaws.com/storify/public/ai4-1706699657952.jpeg",
    "https://s3.ap-northeast-2.amazonaws.com/storify/public/ai5-1706699671535.jpeg",
    "https://s3.ap-northeast-2.amazonaws.com/storify/public/ai6-1706699685087.jpeg",
    "https://s3.ap-northeast-2.amazonaws.com/storify/public/ai7-1706699697628.jpeg",
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleStoryButtonClick = () => {
    if (isLoggedIn) {
      window.location.href = '/writing';
    } else {
      alert("로그인이 필요한 기능입니다.");
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
        className="mySwiper"
        style={{ width: '100%', height: '100vh' }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} style={{ height: '100vh' }}>
            <Image
              src={src}
              alt={`Slide ${index}`}
              layout="fill"
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-[10%] left-[6%] z-10">
        <div className="mb-12 font-bold">
        <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 opacity-0 animate-fadeInUp delay-1s textWithShadow">여러분이 주인공인</h1>
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-0 opacity-0 animate-fadeInUp delay-15s textWithShadow">동화 세계가 펼쳐집니다!</h1>
        </div>
        <div className="mb-6">
        <h2 className="text-gray-200 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-3 opacity-0 animate-fadeInUp delay-2s textWithShadow">이야기를 흥미진진한 동화책으로</h2>
          <h2 className="text-gray-200 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-3 opacity-0 animate-fadeInUp delay-25s textWithShadow">생생한 그림으로 살아나게 해줄 거예요</h2>
        </div>
        <button 
  className="p-2 text-2xl font-bold cursor-pointer hover:text-[#B68973] border rounded-xl border-[#B68973] opacity-0 bg-[#B68973] hover:bg-transparent text-white transition-all duration-300 ease-in-out transform hover:scale-150 animate-fadeInUp delay-3s text-md sm:text-lg md:text-1xl lg:text-2xl xl:text-3xl textWithShadow"
  onClick={handleStoryButtonClick}>
  스토리 만들기
</button>
      </div>
    </div>
  );
};


export default HomeDesign;
