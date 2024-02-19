"use client"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setText as setReduxText } from '@/store/textSlice';
import { resetAll } from '@/store/bookSlice';

type UseSpeechRecognitionReturn = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  error: string;
};

const useSpeechRecognition = (isListening: boolean): UseSpeechRecognitionReturn => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('크롬 브라우저를 사용해 주세요');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setText(transcript);
      dispatch(setReduxText(transcript));
      dispatch(resetAll());
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError('에러발생: ' + event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening, dispatch]);

  return { text, setText, error };
};

export default useSpeechRecognition;
