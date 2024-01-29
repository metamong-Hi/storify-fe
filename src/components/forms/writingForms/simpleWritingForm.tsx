'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SimpleWritingFormProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface BookData {
  _id: string;
}

interface StoryImage {
  imageUrl : String;
}

const SimpleWritingForm: React.FC<SimpleWritingFormProps> = ({ text, setText }) => {

  let token: string | null;
  const [isLoading, setIsLoading] = useState(false);
  const [responseContent, setResponseContent] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [isImageBlurCompleted, setIsImageBlurCompleted] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseContent(data.content);
        setIsLoading(false);
        const bookResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageStyle : "cartoon",
            aiStory: data.content,
            storyId: data.story._id,
          }),
        });

        if (bookResponse.ok) {
          const responseData = await bookResponse.json();
          setBookData(responseData);
          setImageUrls([
            responseData.body["1"].imageUrl,
            responseData.body["2"].imageUrl,
            responseData.body["3"].imageUrl,
          ]);
        
        } else {
        alert('책 제작 요청에 실패했습니다. 다시 시도해주세요.');
        }

      } else {
        alert('제출에 실패했습니다. 다시 시도해주세요.');
      }
      
    } catch (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      console.error('Error submitting story:', error);
    }
  };

  useEffect(() => {
    setDisplayedText(''); 
    let i = 0;
    const typingEffect = (currentText: string) => {
      if (i < responseContent.length) {
        setDisplayedText(currentText + responseContent[i]);
        i++;
        setTimeout(() => typingEffect(currentText + responseContent[i - 1]), 50);
      }
    };
  
    if (responseContent) {
      typingEffect('');
    }
  }, [responseContent]);

  useEffect(() => {

    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [displayedText]); 

  useEffect(() => {
    if (displayedText === responseContent) {
      setIsTypingCompleted(true);
    }
  }, [displayedText, responseContent]);

  useEffect(() => {
    if (isTypingCompleted && imageUrls.length > 0) {
      setIsImageBlurCompleted(false);
      setTimeout(() => {
        setIsImageBlurCompleted(true);
        setTimeout(() => {
          if (bookData) {
            window.location.href = `/book/${bookData._id}`;
          }
        }, 2000);
      }, 5000); 
    }
  }, [isTypingCompleted, imageUrls, bookData]);
  
  const handleButtonClick = () => {
    handleSubmit();
  };

  if (isLoading) {
    return (
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="w-[60vw]">
          <h1 className="text-2xl font-bold mb-4">잠시만 기다려 주세요</h1>
          <h2 className="text-2xl font-bold mb-4">동화책을 만들고 있어요</h2>
          <span className="loading loading-spinner loading-lg"></span>
          <span>로딩중</span>
        </div>
      </div>
    </div>
    );

  }

  if (responseContent) {
    return (
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="w-[60vw]">
            <h1 className="text-2xl font-bold mb-4">동화가 완성됐어요!</h1>
            <h2 className="text-2xl font-bold mb-4">그림도 곧바로 보여줄게요</h2>
            <div className="divider"></div> 
            <textarea placeholder="여기에 간단히 적어줘" 
              className="textarea textarea-bordered textarea-lg w-full" 
              rows={ 6 }
              ref={ textAreaRef }
              value={ displayedText }
              readOnly
            ></textarea>
            <div className="divider"></div> 
            <div className="flex justify-around gap-2">
            {imageUrls.map((url, index) => (
              <Image
                key={ index }
                src={ url }
                alt={ `Image ${index + 1}` }
                width = { 200 }
                height = { 200 }
                className="blur-effect"
              />
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-[60vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="w-[60vw]">
          <h1 className="text-2xl font-bold mb-4">오늘 있었던 일들을 적어봐</h1>
          <h2 className="text-2xl font-bold mb-4">요정이 동화책으로 만들어줄게</h2>
          <div className="divider"></div> 
          <textarea placeholder="여기에 간단히 적어줘" 
            className="textarea textarea-bordered textarea-lg w-full" 
            rows={ 6 }
            value={ text }
            onChange={handleChange}
            ></textarea>
          <div className="divider"></div> 
          <div className = "flex justify-between">
            <button className="btn btn-primary">뒤로 가기</button>
            <button className="btn btn-primary" onClick = { handleButtonClick }>보내기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleWritingForm;
