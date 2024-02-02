'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { setBookContent, setBookId } from '@/store/bookSlice'

interface BookResponseData {
  _id: string;
  body: Record<string, ImageItem>;
}

interface ImageItem {
  imageUrl: string;
}

const loadingTexts = [
  '와, 멋진 글이네요!',
  '요정에게 글을 보낼게요.',
  '글이 요정에게 전달되고 있어요.',
  '요정이 글을 받았어요.',
  '요정이 글을 읽고 있어요.',
  '요정이 어떤 동화로 바꿀 지 생각하고 있어요.',
  '곧 요정이 동화를 써 줄 거예요.',
];

const ComplexWaitingPage: React.FC = () => {
  let token: string | null = null;
  const text = useSelector((state: RootState) => state.text.value);
  const dispatch = useDispatch();

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');

  }

  useEffect(() => {
    console.log(token, text);
  }, [token, text]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/stories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: text }),
        });
  
        if (response.ok) {
          const data = await response.json();
          dispatch(setBookContent(data.content));
          dispatch(setBookId(data.story._id));
          window.location.href = '/writing/simple/result';

        } else {
          alert('제출에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        alert('에러가 발생했습니다. 다시 시도해주세요.');
        console.error('Error submitting story:', error);
      }
    };
  
    fetchData();
  }, [text, dispatch, token]);
  
  return (
        <div className="w-[60vw] h-[20vh]">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            loop={true}
            direction="vertical"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="mySwiper"
            style={{ width: '100%', height: '100%' }}
          >
            {loadingTexts.map((text, index) => (
              <SwiperSlide key={index}>
                <h1 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-4">{text}</h1>
              </SwiperSlide>
            ))}
          </Swiper>
          <span className="loading loading-dots loading-xs sm:loading-sm md:loading-md lg:loading-lg"></span>
        </div>
  );
}

export default ComplexWaitingPage;