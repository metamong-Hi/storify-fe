'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import 'aos/dist/aos.css';
import AOS from 'aos';
import IntroHeading from './IntroHeading';
import IntroText from './IntroText';

const Intro2: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <IntroHeading>디바이스 맞춤 <span className="text-accent">반응형 UI</span></IntroHeading>
      <IntroText>모든 서비스를 언제,어디서나 이용 할 수 있습니다.</IntroText>
      <Image
        src='/static/intro/intro10.png'
        alt="반응형 이미지"
        sizes="100vw"
        width={1440}
        height={720}
        quality={100}
        data-aos="fade-up"
        data-aos-delay="200"
      />
    </div>
  );
};

export default Intro2;
