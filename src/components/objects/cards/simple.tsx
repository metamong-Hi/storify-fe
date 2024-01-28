"use client"
import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from 'next/link';

const SimpleCard = () => {
  const handleCardClick = () => {
    window.location.href = '/writing/simpleWriting';
  };

  return (
    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      className="border-[none] w-1/3 h-2/3 sm: mr-0 md:mr-6 lg:mr-6 mt-10"
      onClick={handleCardClick} 
    >
      <Image
        isZoomed
        alt="동화 생성 선택"
        className="object-cover"
        src= "https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b38a5ae074aed077d12d0b-1706265201395-0.png"
        width="100%"  
        height="100%" 
      />

      <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
      <span 
          className="text-black text-xl" 
          style={{ fontSize: "1.5rem" }}
        >
          간단히 만들기
          </span>
      </CardFooter>
    </Card>
  );
};

export default SimpleCard;

