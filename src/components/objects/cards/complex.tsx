"use client"
import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from 'next/link';
const ComplexCard = () => {
  return (
    
      <Card
        isFooterBlurred
        isPressable
        radius="lg"
        className="border-none w-1/3 h-2/3 sm:ml-0 md:ml-4 lg:ml-6">
          <Link href="/writing/complexWriting/people" passHref>
          <Image
          isZoomed
          alt="동화 생성 선택"
          className="object-cover"
          src="/images/pictures/sample3.png"
          width="100%"   
          height="100%"/>
          </Link>
          <Link href="/writing/complexWriting" passHref>
        <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Button className=" text-black" variant="light" color="secondary" radius="lg" size="lg" style = {{fontSize : "1.25rem "}}>
            자세히 만들기
          </Button>
        </CardFooter>
        </Link>
      </Card>
   

  );
};

export default ComplexCard;

