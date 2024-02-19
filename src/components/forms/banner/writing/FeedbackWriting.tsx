'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFeedbackMessage } from '@/store/textSlice';
import useSpeechRecognition from '@/hooks/writing/useSpeechRecognition';
import TextArea from './TextArea';
import NavigationButtons from './NavigationButtons';
import Title from '../../writing/Title';

const FeedBackWriting: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { text, setText, error } = useSpeechRecognition(isListening);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    dispatch(setFeedbackMessage(newValue));
  };

  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw]">
      <Title line1="이용하면서 좋았던 점," line2="아쉬웠던 점을 알려주세요." />
      <div className="divider"></div>
      <TextArea text={text} handleChange={handleChange} />
      <div className="divider"></div>
      <NavigationButtons isListening={isListening} setIsListening={setIsListening} />
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default FeedBackWriting;
