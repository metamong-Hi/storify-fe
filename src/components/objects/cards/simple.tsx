"use client"
import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from 'next/link';

const SimpleCard = () => {
  const handleCardClick = () => {
    window.location.href = '/writing/simpleWriting';
  };
  const imageUrl = "/images/pictures/sample1.png"

  return (
    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      className="border-[none] w-1/3 h-2/3 sm: mr-0 md:mr-6 lg:mr-6 mt-10"
      onClick={handleCardClick} // Card에 onClick 이벤트 추가
    >
      <Image
        isZoomed
        alt="동화 생성 선택"
        className="object-cover"
        src={imageUrl}
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

