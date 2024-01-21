"use client"
import React, { useState, useEffect } from 'react';
import MediumImageButton from '../buttons/mediumImageButton';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ComplexWritingFormProps {
    destination: string; 
  }

const ComplexWritingForm: React.FC<ComplexWritingFormProps> = ({ destination }) => {
  const [text, setText] = useState('');
  const [accumulatedText, setAccumulatedText] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/writing/complexWriting/background') {
      // Append current text to accumulatedText and send POST request
      sendPostRequest(accumulatedText + text);
    } else if (router.pathname === '/writing/complexWriting/people') {
      // Append current text to accumulatedText
      setAccumulatedText(accumulatedText + text);
    } else if (router.pathname === '/writing/complexWriting/events') {
      // Store the current text without sending a POST request
      setAccumulatedText(text);
    }
  }, [router.pathname, text]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendPostRequest(accumulatedText + text);
  };

  const sendPostRequest = async (finalText: string) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/stories/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: finalText }) 
      });
      if (response.ok) {

        console.log('Story submitted successfully');
      } else {

        console.error('Failed to submit story');
      }
    } catch (error) {

      console.error('Error submitting story:', error);
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <textarea
        id="story"
        name="story"
        rows={10}
        className="w-full bg-white text-gray-800 text-2xl border border-gray-300 rounded-lg shadow-sm p-2 leading-loose focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={text}
        onChange={handleChange}
        style={{
          backgroundSize: '100% 2em',
          backgroundImage: 'linear-gradient(to bottom, transparent 1.9em, #000 1.9em, #000 0.5em, transparent 2em )'
        }}
      />
      <div className="flex justify-end mt-4"> {/* Flex container for right alignment */}
      <Link href={destination} passHref>
            <MediumImageButton 
              imageSrc="/Images/buttons/redArrow.png"
              alt="Submit"
            />
        </Link>
      </div>
    </form>
  );
};

export default ComplexWritingForm;
