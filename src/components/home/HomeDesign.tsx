'use client';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ImageSwiper from './ImageSwiper';
import HeroSection from './HeroSection';
import StoryButton from './StoryButton';

const images = [
  '/static/main/ai1.jpeg',
  '/static/main/ai2.jpeg',
  '/static/main/ai3.jpeg',
  '/static/main/ai4.jpeg',
  '/static/main/ai5.jpeg',
  '/static/main/ai6.jpeg',
  '/static/main/ai7.jpeg',
  '/static/main/ai8.jpeg',
  '/static/main/ai9.jpeg',
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
      <div className="absolute top-[10%] left-[10%] z-10">
        <HeroSection />
        <StoryButton isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default HomeDesign;
