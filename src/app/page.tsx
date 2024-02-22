import React from 'react';
import HomeDesign from '@/components/home/HomeDesign';
import dynamic from 'next/dynamic';

const Intro1 = dynamic(() => import('@/components/home/intro/Intro1'), {
  ssr: false,
});
const Intro2 = dynamic(() => import('@/components/home/intro/Intro2'), {
  ssr: false,
});
const Intro3 = dynamic(() => import('@/components/home/intro/Intro3'), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="flex flex-col items-center ">
      <HomeDesign />
      <Intro1 />
      <Intro2 />
      <Intro3 />
    </div>
  );
}
