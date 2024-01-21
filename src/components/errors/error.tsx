import React from 'react';
import Image from 'next/image';

const Error: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <div className="text-center">
        <div className="mx-auto w-96 h-96 rounded-sm p-2 inline-block relative animate-wiggle" style={{ transformOrigin: 'bottom' }}> 
          <Image 
            src="/images/angels/error.png" 
            alt="Error"
            layout="fill" 
            objectFit="cover" 
            className="rounded-none" 
          />
        </div>
        <h1 className="text-4xl font-bold text-purple-600 mt-4">이런!</h1>
        <p className="text-lg text-purple-500">페이지가 잘못되었나봐요</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="mt-6 px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600"
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
};

export default Error;
