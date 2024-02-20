'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { setBookId, setImageUrls} from '@/store/bookSlice';

interface BookResponseData {
  _id: string;
  body: Record<string, ImageItem>;
}

interface ImageItem {
  imageUrl: string;
}
const Skeleton = () => {
  return (
    <div className="skeleton w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 2xl:w-60 2xl:h-60  "></div>
  );
};

const SimpleResultPage: React.FC = () => {
  const dispatch = useDispatch();
  let token: string | null = null;
  const bookContent = useSelector((state: RootState) => state.book.content);
  const bookId = useSelector((state: RootState) => state.book.bookId);
  const imageUrls = useSelector((state: RootState) => state.book.imageUrls);
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [realImagesLoaded, setRealImagesLoaded] = useState(false);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [isImageBlurCompleted, setIsImageBlurCompleted] = useState(false);
  const [showNavigateButton, setShowNavigateButton] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }

  useEffect(() => {
    if (realImagesLoaded || !bookContent || !bookId) {
      return;
    }
    const sendBookData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/books`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageStyle: 'cartoon',
            aiStory: bookContent,
            storyId: bookId,
          }),
        });
        if (response.ok) {
          const responseData = (await response.json()) as BookResponseData;
          dispatch(setBookId(responseData._id));
          const imageUrls = Object.values(responseData.body).map(
            (item: ImageItem) => item.imageUrl,
          );
          dispatch(setImageUrls(imageUrls));
          setRealImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    sendBookData();
  }, [bookContent, bookId, realImagesLoaded, token, dispatch]);

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
    if (realImagesLoaded) {
      setIsImageBlurCompleted(false);
      setTimeout(() => {
        setIsImageBlurCompleted(true);
        setTimeout(() => {
          if (bookId) {
            setShowNavigateButton(true);
          }
        }, 1000);
      }, 4000);
    }
  }, [realImagesLoaded, bookId]);

  useEffect(() => {
    const adjustScrollForElements = () => {
      let totalHeight = 0;
      imageRefs.current.forEach((img) => {
        if (img) {
          totalHeight += img.offsetHeight + 10;
        }
      });

      if (buttonRef.current) {
        totalHeight += buttonRef.current.offsetHeight + 10;
      }

      if (totalHeight > 0) {
        window.scrollBy({
          top: totalHeight,
          behavior: 'smooth',
        });
      }
    };

    if (realImagesLoaded || showNavigateButton) {
      adjustScrollForElements();
    }
  }, [realImagesLoaded, showNavigateButton]);

  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw]">
      <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 text-base-content">
        요정이 동화책을 만들고 있어요.
      </h1>
      <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 text-base-content">
        잠시만 기다려 주세요.
      </h2>
      <div className="divider"></div>
      <textarea
        placeholder="여기에 간단히 적어줘"
        className="textarea textarea-bordered textarea-lg w-full text-base-content text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
        rows={6}
        ref={textAreaRef}
        value={displayedText}
        readOnly
      ></textarea>
      <div className="divider"></div>
      <div className="flex justify-around gap-2">
        {realImagesLoaded
          ? imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Image ${index + 1}`}
                width={256}
                height={256}
                className="rounded-md blur-effect1 w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 2xl:w-60"
                ref={(el) => (imageRefs.current[index] = el)}
              />
            ))
          : Array.from({ length: imageUrls.length || 4 }, (_, index) => <Skeleton key={index} />)}
      </div>
      {showNavigateButton && (
        <Link href={`/book/${bookId}`} passHref>
          <button
            ref={buttonRef}
            className="btn btn-lg btn-outline btn-primary font-bold border-2 mt-4"
          >
            책 보러 가기
          </button>
        </Link>
      )}
    </div>
  );
};
export default SimpleResultPage;
