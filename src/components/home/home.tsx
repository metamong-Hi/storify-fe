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
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
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
      <div style={{ position: 'absolute', top: '10%', left: '6%', zIndex: 1 }}>
        <div style={{ marginBottom: '3rem', fontWeight: 'bold' }}>
          <h1 className="text-white opacity-0 animate-fadeInUp delay-1s text-xl sm:text-3xl md:text-4xl lg:text-5xl xl: text-6xl mb-5">여러분이 주인공인</h1>
          <h1 className="text-white opacity-0 animate-fadeInUp delay-15s text-xl sm:text-3xl md:text-4xl lg:text-5xl xl: text-6xl mb-0">동화 세계가 펼쳐집니다!</h1>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="text-gray-200 opacity-0 animate-fadeInUp delay-2s text-lg sm:text-xl md:text-2xl lg:text-3xl xl: text-4xl mb-3">이야기를 흥미진진한 동화책으로</h2>
          <h2 className="text-gray-200 opacity-0 animate-fadeInUp delay-25s text-lg sm:text-xl md:text-2xl lg:text-3xl xl: text-4xl mb-3">생생한 그림으로 살아나게 해줄 거예요</h2>
        </div>
        <button style={{ padding: '1rem', fontSize: '2rem', opacity: 0, cursor: 'pointer'}}
         className="text-green-400 opacity-0 animate-fadeInUp delay-3s text-lg sm:text-xl md:text-2xl lg:text-3xl xl: text-4xl"
         onClick={handleStoryButtonClick}>스토리 만들기</button>
      </div>
    </div>
  );
};


export default HomeDesign;
