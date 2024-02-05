// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const Intro1: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF3E0]">
        <h1 className="text-6xl font-bold">
          어린이를 위한 <span className="text-[#B68973]">AI 동화책 생성기</span>
        </h1>

        <p className="mt-3 text-2xl">
          AI가 여러분의 스토리를 듣고 <span className="font-semibold">동화책을 만들어줍니다.</span>
        </p>

        <div className="mt-6">
          <Image src="/ai-illustration.svg" alt="AI Illustration" width={500} height={300} />
        </div>

        <div className="mt-4">
        <button
          className="p-2 text-2xl font-bold cursor-pointer hover:text-[#B68973] border rounded-xl border-[#B68973] opacity-0 bg-[#B68973] hover:bg-transparent text-white transition-all duration-300 ease-in-out transform hover:scale-150 animate-fadeInUp delay-3s text-md sm:text-lg md:text-1xl lg:text-2xl xl:text-3xl textWithShadow"
        >
          스토리 만들기
        </button>
        </div>
    </div>
  );
};

export default Intro1;
