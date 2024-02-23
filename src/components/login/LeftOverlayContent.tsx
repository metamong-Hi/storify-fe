'use client';
import React from 'react';

type LeftOverlayContentProps = {
  isAnimated: boolean;
  setIsAnimated: (isAnimated: boolean) => void;
};

const LeftOverlayContent: React.FC<LeftOverlayContentProps> = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">계정이 있으신가요?</h1>

      <h5 className="text-xl text-white">닉네임과 비밀번호로 로그인 해주세요</h5>
      <div className="mt-16">
        <button
          className="py-3 px-6 bg-transparent rounded-full text-center text-white text-xl font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
          onClick={() => setIsAnimated(!isAnimated)}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
