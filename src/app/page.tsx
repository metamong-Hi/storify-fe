import React, { lazy } from 'react';
const HomeDesign = lazy(() => import('@/components/home/HomeDesign'));
const Intro1 = lazy(() => import('@/components/home/intro/Intro1'));
const Intro3 = lazy(() => import('@/components/home/intro/Intro2'));
const Intro4 = lazy(() => import('@/components/home/intro/Intro3'));

export default function Page() {
  return (
    <div className="flex flex-col items-center ">
      <HomeDesign />
      <Intro1 />
      <Intro3 />
      <Intro4 />
    </div>
  );
}
