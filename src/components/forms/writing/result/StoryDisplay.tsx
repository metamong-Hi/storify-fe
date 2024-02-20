'use client';
import React, { useEffect, useState, useRef } from 'react';

interface StoryDisplayProps {
  bookContent: string;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ bookContent }) => {
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const typingEffect = (currentText: string) => {
      if (i < bookContent.length) {
        setDisplayedText(currentText + bookContent[i]);
        i++;
        setTimeout(() => typingEffect(currentText + bookContent[i - 1]), 50);
      }
    };

    if (bookContent) {
      typingEffect('');
    }
  }, [bookContent]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <textarea
      placeholder="여기에 간단히 적어줘"
      className="textarea textarea-bordered textarea-lg w-full text-base-content"
      rows={6}
      ref={textAreaRef}
      value={displayedText}
      readOnly
    ></textarea>
  );
};

export default StoryDisplay;
