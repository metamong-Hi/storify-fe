'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface EmailFeedBackProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const EmailFeedBack: React.FC<EmailFeedBackProps> = ({ text, setText }) => {
  let token: string | null;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });
      if (response.status === 201) {
        setIsSubmitted(true);
        setIsLoading(false);
      } else {
        alert('제출에 실패했습니다. 다시 시도해주세요.');
        setIsLoading(false);
      }
    } catch (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      console.error('Error submitting message:', error);
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  if (isLoading) {
    return (
      <div className="hero min-h-[60vh]">
        <div className="hero-content text-center">
          <div className="w-[60vw]">
            <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
              잠시만 기다려 주세요
            </h1>
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
              의견을 전달하고 있어요
            </h2>
            <span className="loading loading-dots loading-xs sm:loading-sm md:loading-md lg:loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="hero min-h-[60vh]">
        <div className="hero-content text-center">
          <div className="w-[60vw]">
            <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
              소중한 의견 감사드립니다.
            </h1>
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
              더 나은 StORIFY로 보답하겠습니다.
            </h2>
            <div className="divider"></div>
            <Link href="/" passHref>
              <button className="btn font-bold border-2">
                홈으로 가기
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-[60vh]">
      <div className="hero-content text-center">
        <div className="w-[60vw]">
          <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
            이용하면서 좋았던 점, 아쉬웠던 점을 알려주세요
          </h1>
          <div className="divider"></div>
          <textarea
            placeholder="여러분의 의견을 적극 반영하겠습니다."
            className="textarea textarea-bordered textarea-lg w-full"
            rows={6}
            value={text}
            onChange={handleChange}
          ></textarea>
          <div className="divider"></div>
          <div className="flex justify-between">
            <Link href="/" passHref>
              <button className="btn font-bold border-2">
                뒤로 가기
              </button>
            </Link>
            <button
              className="btn btn-primary font-bold border-2"
              onClick={handleButtonClick}
            >
              보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailFeedBack;
