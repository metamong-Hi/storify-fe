"use client"
import React, { useState,useEffect} from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

const HomeDesign: React.FC = () => {
  const images = [
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b4e1bd7f45b987a17dd7b4-1706353098878-1.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b62cd0a215ffe433c275a5-1706437858702-3.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/storybook-1705904614133-0.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/storybook-1705666336148-0.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/storybook-1705651912837-0.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b7a54ccfc99e51b05a12bf-1706534242440-1.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b60863786ccd58c5a6deda-1706428528891-2.png",
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    const token=sessionStorage.getItem('token');
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
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Slide ${index}`}
              layout="fill"
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ position: 'absolute', top: '25%', left: '10%', zIndex: 1 }}>
        <div style={{ marginBottom: '2rem', fontWeight: 'bold' }}>
          <h1 className="text-white opacity-0 animate-fadeInUp delay-1s text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl: text-6xl mb-6">여러분의 평범한 일상을</h1>
          <h1 className="text-white opacity-0 animate-fadeInUp delay-15s text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl: text-6xl mb-6">동화책으로 만들어 드려요</h1>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <h2 className="text-white opacity-0 animate-fadeInUp delay-2s text-lg sm:text-xl md:text-2xl lg:text-3xl xl: text-4xl mb-4">저희에게 평범한 일상을 공유해 주세요</h2>
          <h2 className="text-white opacity-0 animate-fadeInUp delay-25s text-lg sm:text-xl md:text-2xl lg:text-3xl xl: text-4xl mb-4">AI가 글과 그림을 만들어 줄 거에요</h2>
        </div>
        <button style={{ padding: '1rem', fontSize: '2rem', opacity: 0, cursor: 'pointer'}}
         className="text-white opacity-0 animate-fadeInUp delay-3s text-lg sm:text-xl md:text-2xl lg:text-3xl xl: text-4xl"
         onClick={handleStoryButtonClick}>스토리 만들기</button>
      </div>
    </div>
  );
};


export default HomeDesign;
