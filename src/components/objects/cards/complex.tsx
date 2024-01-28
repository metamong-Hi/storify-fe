"use client"
import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from 'next/link';
const ComplexCard = () => {

  const handleCardClick = () => {
    window.location.href = '/writing/complexWriting/people';
  };

  return (

    <Card
      isFooterBlurred
      isPressable
      radius="lg"
      className="border-none w-1/3 h-2/3 sm:ml-0 md:ml-4 lg:ml-6 mt-10"
      onClick={handleCardClick}
    >
      <Image
        isZoomed
        alt="동화 생성 선택"
        className="object-cover"
        src="https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b3ae00f22246ba2780ccc7-1706274325596-0.png"
        width="100%"   
        height="100%"

      />


      <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
      >
        <span 
          className="text-[#1E212D] text-xl" 
          style={{ fontSize: "1.5rem" }}
        >
          자세히 만들기
          </span>
      </CardFooter>
    </Card>
  );
};

export default ComplexCard;

