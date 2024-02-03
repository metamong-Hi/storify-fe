'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setText as setReduxText } from '@/store/textSlice';
import Link from 'next/link';

const SimpleWritingPage: React.FC = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const dispatch = useDispatch();

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
  
    let finalTranscript = '';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptionPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptionPiece;
        } else {
          interimTranscript += transcriptionPiece;
        }
      }
      setText(finalTranscript + interimTranscript);
      dispatch(setReduxText(finalTranscript + interimTranscript));
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
      <h1 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-2">동화로 만들고 싶은 이야기를 적어 주세요.</h1>
      <textarea
        placeholder="여기에 이야기를 적어주세요"
        className="textarea textarea-bordered textarea-success textarea-lg w-full"
        rows={6}
        value={text}
        onChange={handleChange}
      ></textarea>
      <div className="flex justify-between items-center">
        <Link href={`/writing`} passHref>
          <button className="btn btn-outline btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            뒤로 가기
          </button>
        </Link>
        <button onClick={() => setIsListening((prevState) => !prevState)} className="btn btn-primary">
          {isListening ? '마이크 끄기' : '마이크 켜기'}
        </button>
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