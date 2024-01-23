"use client"
import React, { useState, forwardRef  } from 'react';
import MediumImageButton from '../buttons/mediumImageButton';
import Link from 'next/link';

interface SimpleWritingFormProps {
  destination: string; 
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

function getCookie(name:string) {
  let cookieArr = document.cookie.split(";");
  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if(name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}
const SimpleWritingForm: React.FC<SimpleWritingFormProps> = ({ text, setText, destination, textAreaRef }) => {
  const token = localStorage.getItem('token');
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  
  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault(); 
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/stories/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`


        },
        body: JSON.stringify({ message: text }) 
      });
      if (response.ok) {
        console.log('Story submitted successfully');
        console.log(response)

        console.log("뭔데 그래서");

        alert(response);
      } else {
        console.log("그래서 뭔데");
        console.error('Failed to submit story');
      }
    } catch (error) {

      console.error('Error submitting story:', error);
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <textarea
        ref={textAreaRef}
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
              onClick={handleButtonClick}
              imageSrc="/Images/buttons/redArrow.png"
              alt="Submit"
            />
        </Link>
      </div>
    </form>
    );
  };

export default SimpleWritingForm;
