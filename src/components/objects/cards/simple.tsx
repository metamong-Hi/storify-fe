"use client"
import React from "react";
import Image from "next/image";
import Link from 'next/link';

const SimpleCard = () => {

  return (
    <Link href="/writing/simpleWriting" passHref>
      <div className="card w-112 glass mr-6 mt-10 cursor-pointer">
        <figure>
          <Image src="https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b38a5ae074aed077d12d0b-1706265201395-0.png"
            alt="동화 생성 선택" 
            width={400} 
            height={400}
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title">간단히 만들기</h1>
          <h2>혼자서 동화를 만들어볼래요?</h2>
        </div>
      </div>
    </Link>
  );
};

export default SimpleCard;

