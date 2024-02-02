'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { setBookContent, setBookId, setImageUrls } from '@/store/bookSlice';

interface BookResponseData {
  _id: string;
  body: Record<string, ImageItem>;
}

interface ImageItem {
  imageUrl: string;
}

const SimpleResultPage: React.FC = () => {
  const dispatch = useDispatch();
  let token: string | null = null;
  const bookContent = useSelector((state: RootState) => state.book.content);

  const bookId = useSelector((state: RootState) => state.book.bookId);
  const [responseContent, setResponseContent] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [realImagesLoaded, setRealImagesLoaded] = useState(false);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [isImageBlurCompleted, setIsImageBlurCompleted] = useState(false);
  const [showNavigateButton, setShowNavigateButton] = useState(false);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);

  const Skeleton = () => {
    return <div className="skeleton w-16 sm:w-20 md:w-24 lg:w-36 xl:w-48 2xl:w-60"></div>;
  };

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  useEffect(() => {
    console.log(bookContent, bookId, newImageUrls);
  }, [bookContent, bookId, newImageUrls]);

  useEffect(() => {
    // POST 요청을 보내는 함수를 정의합니다.
    const sendBookData = async () => {
      if (bookContent && bookId) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/books`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // token은 적절히 설정해야 합니다.
            },
            body: JSON.stringify({
              imageStyle: 'cartoon',
              content: bookContent,
              id: bookId,
            }),
          });
          if (response.ok) {
            const responseData = (await response.json()) as BookResponseData;
            console.log("API Response Data:", responseData); // 응답 데이터 로깅
            const imageUrls = Object.values(responseData.body).map(
              (item: ImageItem) => item.imageUrl,
            );
            dispatch(setBookId(responseData._id));
            dispatch(setImageUrls(imageUrls));
            setNewImageUrls(imageUrls);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    sendBookData();
  }, [bookContent, bookId, token, dispatch]); // 의존성 배열에 포함

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

  useEffect(() => {
    if (displayedText === bookContent) {
      setIsTypingCompleted(true);
    }
  }, [displayedText, bookContent]);

  useEffect(() => {
    if (isTypingCompleted && newImageUrls.length > 0) {
      setIsImageBlurCompleted(false);
      setTimeout(() => {
        setIsImageBlurCompleted(true);
        setTimeout(() => {
          if (bookId) {
            setShowNavigateButton(true);
          }
        }, 2000);
      }, 5000);
    }
  }, [isTypingCompleted, newImageUrls, bookId]);

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

  return (
    <div className="w-[60vw]">
      <h1 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl  font-bold mb-4">요정이 동화책을 만들고 있어요.</h1>
      <h2 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-4">잠시만 기다려 주세요.</h2>
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
          newImageUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Image ${index + 1}`}
              width={256}
              height={256}
              className="rounded-md blur-effect1 w-16 sm:w-20 md:w-24 lg:w-36 xl:w-48 2xl:w-60"
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
        <Link href={`/book/${bookId}`} passHref>
          <button className="btn btn-outline btn-success btn-xm sm:btn-sm md:btn-md lg:btn-lg mt-4">
            책 보러 가기
          </button>
        </Link>
      )}
    </div>
  );
};
export default SimpleResultPage;
