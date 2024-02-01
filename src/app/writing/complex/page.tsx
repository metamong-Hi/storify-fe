"use client"
import React, { useRef, useEffect  } from 'react';
import ComplexWritingForm from '@/components/forms/writing/complex/complexWritingForm';


const ComplexWritingPage: React.FC = () => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // 화면 크기가 변경될 때 배경 높이를 조절하는 함수
  const adjustBackgroundHeight = () => {
    if (textAreaRef.current) {
      const windowHeight = window.innerHeight;
      textAreaRef.current.style.minHeight = `${windowHeight}px`;
    }
  };

  // 페이지 로드 및 창 크기 변경 시 배경 높이 조절 함수 호출
  useEffect(() => {
    adjustBackgroundHeight();
    window.addEventListener('resize', adjustBackgroundHeight);
    return () => {
      window.removeEventListener('resize', adjustBackgroundHeight);
    };
  }, []);

  return (
    <div className="min-h-[100vh] bg-[#FAF3E0] w-full flex flex-col items-center">
      <div className ="mt-5">
        <ComplexWritingForm/>
      </div>
    </div>
  );
};
export default ComplexWritingPage;