"use client"
import React from "react";
import Image from "next/image";
import Link from 'next/link';

const ComplexCard = () => {
  return (
    <Link href="/writing/complexWriting/people" passHref>
      <div className="card w-112 glass ml-6 mt-10 cursor-pointer">
        <figure>
          <Image src="https://s3.ap-northeast-2.amazonaws.com/storifybucket/65b3ae00f22246ba2780ccc7-1706274325596-0.png"
            alt="동화 생성 선택" 
            width={400} 
            height={400}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">자세히 만들기</h2>
          <p>요정과 함께 동화를 만들어볼까요?</p>
        </div>
      </div>
    </Link>
  );
};

export default ComplexCard;

