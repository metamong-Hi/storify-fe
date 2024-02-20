"use client"
import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFetchStory } from '@/hooks/writing/useFetchStory';
import LoadingTextSwiper from './LoadingTextSwiper';
import LoadingIndicator from '../../banner/waiting/LoadingIndicator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

const SimpleWaiting: React.FC = () => {
  const text = useSelector((state: RootState) => state.text.value);
  let token: string | null = null;


  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }

  const { isSuccess } = useFetchStory({ text, token });
  const router = useRouter();

  React.useEffect(() => {
    if (isSuccess) {
      router.push(`/writing/simple/result`);
    }
  }, [isSuccess, router]);


  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw] h-[60vh] flex flex-col justify-center items-center">
      <LoadingTextSwiper />
      {!isSuccess && <LoadingIndicator />}
    </div>
  );
};

export default SimpleWaiting;
