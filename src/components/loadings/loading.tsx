import React from 'react';
import Image from 'next/image';
import Gauge from '../gauge/gauge';

interface LoadingProps {
  // Add any additional props you might need
}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <div className="text-center">
        <div className="inline-block relative w-96 h-96 animate-bounce">
          <Image 
            src="/Images/angels/loading.png" // Replace with the path to your loading image
            alt="Loading"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
          
        </div>
        <Gauge/>
        <p className="text-3xl text-purple-500 mt-4">로딩중</p>
      </div>
    </div>
  );
};

export default Loading;