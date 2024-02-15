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
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw]">
      <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 text-base-content">
        동화로 만들고 싶은
      </h1>

      <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 text-base-content">
        이야기를 적어 주세요.
      </h1>


      <div className="divider"></div>
      <textarea
        placeholder="여기에 이야기를 적어주세요"
        className="textarea textarea-bordered textarea-lg text-base-content w-full"
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
          <button className="btn btn-primary font-bold border-2">동화책 만들기</button>
        </Link>
      </div>
    </div>
  );
};

export default SimpleWritingPage;
