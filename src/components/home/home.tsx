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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="flex justify-between items-center">
      
    <div style={{textAlign:'center', fontSize:'30px', paddingRight:'30px'}}>
        <h1>여러분의 평범한 일상을</h1>
        <h1>동화책으로 만들어 드려요</h1>
        <h2>저희에게 평범한 일상을 공유해 주세요</h2>
        <h2>AI가 글과 그림을 만들어 줄 거에요</h2>
        <button>스토리 만들기</button>
        </div>
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
       
       <Image
         src={images[currentImageIndex]}
         alt={`Slide ${currentImageIndex}`}
         style={{objectFit:"fill"}}
       />
       </div>
  </div>
  );
};

export default HomeDesign;
