"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

type ImageSliderProps = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000);
  
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="relative overflow-hidden">
      <div className="whitespace-nowrap transition-transform duration-500"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="inline-block w-full">
            <Image src={image} alt={`Slide ${index}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
