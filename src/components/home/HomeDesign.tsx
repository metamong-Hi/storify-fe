'use client';
import React, { useState, useEffect, lazy } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const ImageSwiper = lazy(()=> import('./ImageSwiper'));
const HeroSection = lazy(()=> import('./HeroSection'));
const StoryButton = lazy(()=> import('./StoryButton'));

const images = [
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai1-1706699591500.jpeg',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai2-1706699626175.jpeg',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai3-1706699643732.jpeg',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai4-1706699657952.jpeg',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai5-1706699671535.jpeg',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai6-1706699685087.jpeg',
  'https://s3.ap-northeast-2.amazonaws.com/storify/public/ai7-1706699697628.jpeg',
];

const HomeDesign: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="relative w-full h-full">
      <ImageSwiper images={images} />
      <HeroSection />
      <StoryButton isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default HomeDesign;
