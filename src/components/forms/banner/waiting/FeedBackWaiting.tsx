'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSubmitFeedback from '@/hooks/feedback/useSubmitFeedback';
import LoadingTextSwiper from './LoadingTextSwiper';
import LoadingIndicator from './LoadingIndicator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

const FeedBackWaiting: React.FC = () => {
  const feedbackMessage = useSelector((state: RootState) => state.text.feedbackMessage);
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }
  const router = useRouter();
  const [submit, { isSubmitted, error }] = useSubmitFeedback();

  useEffect(() => {
    if (feedbackMessage && token) {
      submit({ text: feedbackMessage, token });
    }
  }, [feedbackMessage, token, submit]);

  useEffect(() => {
    if (isSubmitted) {
      router.push('/feedback/result');
    }
  }, [isSubmitted, router]);

  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[75vw] xl:w-[70vw] h-[60vh] flex flex-col justify-center items-center">
      <LoadingTextSwiper />
      {!isSubmitted && <LoadingIndicator />}
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default FeedBackWaiting;
