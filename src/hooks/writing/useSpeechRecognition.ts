"use client"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setText as setReduxText } from '@/store/textSlice';
import { resetAll } from '@/store/bookSlice';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        title: '브라우저 호환성 문제',
        text: '크롬 브라우저를 사용해 주세요',
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      });
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
      const errorMessage = '에러발생: ' + event.error;
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: '음성 인식 에러',
        text: errorMessage,
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      });
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
