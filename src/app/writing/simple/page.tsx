'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setText as setReduxText } from '@/store/textSlice';
import Link from 'next/link';

const SimpleWritingPage: React.FC = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech API. Please try Google Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechEvent = event as SpeechRecognitionEvent;
      const transcript = Array.from(speechEvent.results)
        .map((result) => result[0].transcript)
        .join('');
      setText(transcript);
      dispatch(setReduxText(transcript));
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError('Speech recognition error: ' + event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    dispatch(setReduxText(newValue));
  };

  return (
    <div className="w-[60vw]">
      {isListening && (
        <div className="alert alert-error text-center mx-auto w-full sm:w-48 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
            마이크가 켜져있어요
          </span>
        </div>
      )}
      <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
        동화로 만들고 싶은
      </h1>
      <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
        이야기를 적어 주세요.
      </h1>

      <div className="divider"></div>
      <textarea
        placeholder="여기에 이야기를 적어주세요"
        className="textarea textarea-bordered textarea-lg w-full"
        rows={6}
        value={text}
        onChange={handleChange}
      ></textarea>
      <div className="divider"></div>
      <div className="flex justify-between items-center">
        <Link href={`/writing`} passHref>
          <button className="btn font-bold border-2">뒤로 가기</button>
        </Link>
        <button
          onClick={() => setIsListening((prevState) => !prevState)}
          className={`btn font-bold border-2 btn-error ${isListening ? '' : 'btn-outline'}`}
        >
          {isListening ? '마이크 끄기' : '마이크 켜기'}
        </button>
        <Link href={`/writing/simple/waiting`} passHref>
          <button className="btn font-bold border-2">동화책 만들기</button>
        </Link>
      </div>
    </div>
  );
};

export default SimpleWritingPage;
