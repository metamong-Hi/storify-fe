"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetAll } from '@/store/bookSlice';
import { setText as setReduxText } from '@/store/textSlice';
import useSpeechRecognition from '@/hooks/writing/useSpeechRecognition';
import TextArea from './TextArea';
import NavigationButtons from './NavigationButtons';
import Title from '../Title';

const SimpleWriting: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { text, setText, error } = useSpeechRecognition(isListening);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    dispatch(setReduxText(newValue));
    dispatch(resetAll());
  };

  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw]">
      <Title line1="동화로 만들고 싶은" line2="이야기를 적어 주세요." />
      <div className="divider"></div>
      <TextArea text={text} handleChange={handleChange} />
      <div className="divider"></div>
      <NavigationButtons isListening={isListening} setIsListening={setIsListening} />
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default SimpleWriting;
