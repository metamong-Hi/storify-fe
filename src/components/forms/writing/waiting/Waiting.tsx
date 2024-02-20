"use client"
import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFetchStory } from '@/hooks/writing/useFetchStory';
import LoadingTextSwiper from './LoadingTextSwiper';
import LoadingIndicator from '../../banner/waiting/LoadingIndicator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import SimpleWaitingSkeleton from '@/components/skeleton/writing/SimpleWaiting';

const SimpleWaiting: React.FC = () => {
  const text = useSelector((state: RootState) => state.text.value);
  let token: string | null = null;

  const [isLoading, setIsLoading] = useState(true); // 초기 상태는 로딩 중

  useEffect(() => {
    // 5초 후에 로딩 상태를 false로 변경합니다.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // 컴포넌트 언마운트 시 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <SimpleWaitingSkeleton />; 
  }

  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw] h-[60vh] flex flex-col justify-center items-center">
      <LoadingTextSwiper />
      {!isSuccess && <LoadingIndicator />}
    </div>
  );
};

export default SimpleWaiting;
