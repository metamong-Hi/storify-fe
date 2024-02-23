'use client';
import React from 'react';

type RightOverlayContentProps = {
  isAnimated: boolean;
  setIsAnimated: (isAnimated: boolean) => void;
};

const RightOverlayContent: React.FC<RightOverlayContentProps> = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">계정이 없으신가요?</h1>

      <h5 className="text-xl text-white">환영합니다</h5>
      <div className="mt-16">
        <button
          className="py-3 px-6 bg-transparent rounded-full text-center text-white font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
          onClick={() => setIsAnimated(!isAnimated)}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default RightOverlayContent;
