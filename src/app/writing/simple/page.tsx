'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setText as setReduxText } from '@/store/textSlice'; 
import Link from 'next/link';

const SimpleWritingPage: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    dispatch(setReduxText(text));
  };
  return (
    <div className="w-[60vw]">
      <h1 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-2">동화로 만들고 싶은 이야기를 적어 주세요.</h1>
      <h1 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-2">
        겪었던 일도 괜찮고, 상상한 이야기를 적어도 괜찮아요.
      </h1>
      <div className="divider"></div>
      <textarea
        placeholder="예시 : 오늘은 가족들과 바다로 여행을 갔다. 동생과 바다에서 수영도 하고, 모래 사장에서 모래성도 쌓았다. 열심히 놀았더니 배가 너무 고팠다. 부모님이 바닷가 근처 식당에서 해물 라면을 사 주셨다. 수영 후에 먹는 라면은 정말 맛있었다. 다음에도 또 바다로 여행을 가고 싶다."
        className="textarea textarea-bordered textarea-success textarea-lg w-full"
        rows={6}
        value={text}
        onChange={handleChange}
      ></textarea>
      <div className="divider"></div>
      <div className="flex justify-between">
        <Link href={`/writing`} passHref>
          <button className="btn btn-outline btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            뒤로 가기
          </button>
        </Link>
        <Link href={`/writing/simple/waiting`} passHref>
          <button className="btn btn-outline btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            동화책 만들기
          </button>
        </Link>

      </div>
    </div>
  );
};

export default SimpleWritingPage;
