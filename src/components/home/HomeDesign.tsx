'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Swal from 'sweetalert2';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useRouter } from 'next/navigation';

const HomeDesign: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleStoryButtonClick = () => {
    if (isLoggedIn) {
      router.push('/writing');
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '이 기능을 사용하려면 로그인이 필요합니다.',
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      });
    }
  };

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
        className="mySwiper relative z-0 w-[100vw] h-[100vh]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image src={src} alt={`Slide ${index}`} layout="fill" objectFit="cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-[10%] left-[6%] z-10">
        <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 font-bold">
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 textWithShadow"
            data-aos="fade-up"
          >
            여러분이 주인공인
          </h1>
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl textWithShadow"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            동화 세계가 펼쳐집니다!
          </h1>
        </div>
        <div className="mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5">
          <h2
            className="text-gray-200 text-lg md:text-xl lg:text-2xl xl:text-3xl mb-0 sm:mb-0.5 md:mb-1 lg:mb-2 xl:mb-3 2xl:mb-4 textWithShadow"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            이야기를 흥미진진한 동화책으로
          </h2>
          <h2
            className="text-gray-200 text-lg md:text-xl lg:text-2xl xl:text-3xl mb-0 sm:mb-0.5 md:mb-1 lg:mb-2 xl:mb-3 2xl:mb-4 textWithShadow"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            생생한 그림으로 살아나게 해줄 거예요
          </h2>
        </div>
        <button
          className="px-2 py-1 border-2 rounded-lg border-white md:px-2 md:py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-3 font-bold cursor-pointer hover:text-black hover:border-black text-white opacity-0 duration-300 ease-in-out transform sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:tet-4xl textWithShadow"
          data-aos="fade-up"
          data-aos-delay="100"
          onClick={handleStoryButtonClick}
        >
          동화 만들기
        </button>
      </div>
    </div>
  );
};

export default HomeDesign;
