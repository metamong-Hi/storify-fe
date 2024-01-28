"use client"
import React, { useState,useEffect} from 'react';
import {Image} from "@nextui-org/react";
const HomeDesign: React.FC = () => {
  const images = [
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b4e1bd7f45b987a17dd7b4-1706353098878-1.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b4eb8adbd32bdb80e1916e-1706355621002-1.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b62cd0a215ffe433c275a5-1706437858702-3.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/storybook-1705904614133-0.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/storybook-1705666336148-0.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/storybook-1705651912837-0.png",
    "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b21b0085934f892bf9229b-1706171165813-0.png",

  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1); // 이미지가 등장할 때 투명도를 1로 설정
    const timer = setInterval(() => {
      setOpacity(0); // 다음 이미지 전환 전 투명도를 0으로 설정
      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
        setOpacity(1); // 이미지가 완전히 변경된 후 투명도를 1로 설정
      }, 500); // 투명도 변경에 걸리는 시간
    }, 6000); // 이미지 변경 주기

    return () => clearInterval(timer);
  }, [currentImageIndex, images.length]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'top', width: '100vw', height: '100vh' }} className="bg-[#FAF3E0]/80">
      <div style={{ flex: 0.75, paddingTop : '10%', paddingLeft: '5%', textAlign: 'left' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
          <h1 style={{ opacity: 0 }} className="text-[#1E212D] animate-fadeInUp delay-1s">여러분의 평범한 일상을</h1>
          <h1 style={{ opacity: 0 }} className="text-[#EABF9F] animate-fadeInUp delay-15s">동화책으로 만들어 드려요</h1>
        </div>
        <div style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>
          <h2 style={{ opacity: 0 }} className="text-[#1E212D] animate-fadeInUp delay-2s">저희에게 평범한 일상을 공유해 주세요</h2>
          <h2 style={{ opacity: 0 }} className="text-[#1E212D] animate-fadeInUp delay-25s">AI가 글과 그림을 만들어 줄 거에요</h2>
        </div>
        <button style={{ padding: '1rem', fontSize: '1.5rem', opacity: 0 }} className="text-[#B68973] animate-fadeInUp delay-3s">스토리 만들기</button>
      </div>
      <div style={{ flex: 1,  overflow: 'hidden' }}>
        <Image
          radius = 'none'
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover',opacity: opacity, transition: 'opacity 0.5s ease-in-out'}}
        />
      </div>
    </div>
  );
};


export default HomeDesign;
