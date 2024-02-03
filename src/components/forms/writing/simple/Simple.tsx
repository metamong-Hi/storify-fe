'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BookData {
  _id: string;
}

const SimpleWritingForm = () => {
  let token: string | null;
  const [responseContent, setResponseContent] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [realImagesLoaded, setRealImagesLoaded] = useState(false);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [isImageBlurCompleted, setIsImageBlurCompleted] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [showNavigateButton, setShowNavigateButton] = useState(false);

  const Skeleton = () => {
    return <div className="skeleton w-64 h-64"></div>;
  };

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
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
        const bookResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageStyle: 'cartoon',
            aiStory: data.content,
            storyId: data.story._id,
          }),
        });

        if (bookResponse.ok) {
          const responseData = await bookResponse.json();
          setBookData(responseData);
          setImageUrls([
            responseData.body['1'].imageUrl,
            responseData.body['2'].imageUrl,
            responseData.body['3'].imageUrl,
          ]);
          setRealImagesLoaded(true);
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
            setShowNavigateButton(true);
          }
        }, 2000);
      }, 5000);
    }
  }, [isTypingCompleted, imageUrls, bookData]);

  const handleButtonClick = () => {
    handleSubmit();
  };

  useEffect(() => {
    const scrollToBottom = () => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    };

    if (realImagesLoaded || showNavigateButton) {
      scrollToBottom();
    }
  }, [realImagesLoaded, showNavigateButton]);

  if (responseContent) {
    return (
      <div className="hero min-h-[60vh] rounded-2xl shadow-lg p-4 glass">
        <div className="hero-content text-center">
          <div className="w-[60vw]">
            <h1 className="text-2xl font-bold mb-4">요정이 동화책을 만들고 있어요.</h1>
            <h2 className="text-2xl font-bold mb-4">잠시만 기다려 주세요.</h2>
            <div className="divider"></div>
            <textarea
              placeholder="여기에 간단히 적어줘"
              className="textarea textarea-bordered textarea-success textarea-lg w-full"
              rows={6}
              ref={textAreaRef}
              value={displayedText}
              readOnly
            ></textarea>
            <div className="divider"></div>
            <div className="flex justify-around gap-2">
              {realImagesLoaded ? (
                imageUrls.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    width={256}
                    height={256}
                    className="rounded-md blur-effect1"
                  />
                ))
              ) : (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              )}
            </div>
            {showNavigateButton && (
              <Link href={`/book/${bookData?._id}`} passHref>
                <button className="btn btn-outline btn-success btn-xm sm:btn-sm md:btn-md lg:btn-lg mt-4">
                  책 보러 가기
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default SimpleWritingForm;
