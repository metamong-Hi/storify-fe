'use client';
import React, { useRef, useEffect } from 'react';
import ComplexWritingForm from '@/components/forms/writing/complex/Complex';

const ComplexWritingPage: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const adjustBackgroundHeight = () => {
    if (textAreaRef.current) {
      const windowHeight = window.innerHeight;
      textAreaRef.current.style.minHeight = `${windowHeight}px`;
    }
  };

  useEffect(() => {
    adjustBackgroundHeight();
    window.addEventListener('resize', adjustBackgroundHeight);
    return () => {
      window.removeEventListener('resize', adjustBackgroundHeight);
    };
  }, []);

  return (
    <div className="min-h-[100vh] bg-[#FAF3E0] w-full flex flex-col items-center">
      <div className="mt-5">
        <ComplexWritingForm />
      </div>
    </div>
  );
};
export default ComplexWritingPage;