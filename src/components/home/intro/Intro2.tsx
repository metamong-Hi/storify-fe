// pages/index.tsx
'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Intro2: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1
        className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 font-bold text-base-content"
        data-aos="fade-up"
      >
        디바이스 맞춤 <span className="text-accent">반응형 UI</span>
      </h1>
      <p
        className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 text-base-content"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        모든 서비스를 <span className="font-semibold">언제,어디서나</span> 이용 할 수 있습니다.
      </p>
      <Image
        src="https://s3.ap-northeast-2.amazonaws.com/storify/public/OR7V171-removebg-1707127021387.png"
        alt="반응형 이미지"
        width={1440}
        height={720}
        data-aos="fade-up"
        data-aos-delay="600"
      />
    </div>
  );
};

export default Intro2;
