'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Image
        src="https://s3.ap-northeast-2.amazonaws.com/storify/public/CE9866CAD59FC17B8AFB52161ED9A8729F2BB90639CB0C214D8864B625B7F643 (1)-1708088076682.jpeg"
        className="relative z-0"
        alt="landscape"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/3 z-10">
        <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 textWithShadow">
          미안해요
        </h1>
        <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 textWithShadow">
          페이지를 찾을 수 없어요
        </h1>
        <div className="flex flex-row justify-around">
          <Link
            href="/"
            className="mt-4 px-4 py-2 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:tet-4xl border-2 text-white rounded hover:text-black hover:border-black transition duration-300 textWithShadow"
          >
            <p>홈으로</p>
          </Link>
          <Link
            href="/allbooks"
            className="mt-4 px-4 py-2 border-2 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:tet-4xl text-white rounded hover:text-black hover:border-black transition duration-300 textWithShadow"
          >
            <p>책장으로</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
