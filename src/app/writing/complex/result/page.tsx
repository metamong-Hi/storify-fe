'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { setBookId, setImageUrls } from '@/store/bookSlice';

interface BookResponseData {
  _id: string;
  body: Record<string, ImageItem>;
}

interface ImageItem {
  imageUrl: string;
}

const Skeleton = () => {
  return (
    <div className="skeleton w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-36 lg:h-36 xl:w-48 xl:h-48 2xl:w-60 2xl:h-60 "></div>
  );
};

const ComplexResultPage: React.FC = () => {
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
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

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
    if (imageUrls.length > 0 && !realImagesLoaded) {
      setRealImagesLoaded(true);
    }
  }, [imageUrls, realImagesLoaded]);

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
    if (isTypingCompleted) {
      setIsImageBlurCompleted(false);
      setTimeout(() => {
        setIsImageBlurCompleted(true);
        setTimeout(() => {
          if (bookId) {
            setShowNavigateButton(true);
          }
        }, 0);
      }, 2000);
    }
  }, [isTypingCompleted, bookId]);

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
    <div className="w-[60vw]">
      <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
        요정이 동화책을 만들고 있어요.
      </h1>
      <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2">
        잠시만 기다려 주세요.
      </h2>
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
        {realImagesLoaded
          ? imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Image ${index + 1}`}
                width={256}
                height={256}
                className="rounded-md blur-effect1 w-16 sm:w-20 md:w-24 lg:w-36 xl:w-48 2xl:w-60"
                ref={(el) => (imageRefs.current[index] = el)}
              />
            ))
          : Array.from({ length: imageUrls.length || 3 }, (_, index) => <Skeleton key={index} />)}
      </div>
      {showNavigateButton && (
        <Link href={`/book/${bookId}`} passHref>
          <button
            ref={buttonRef}
            className="btn btn-outline btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-4"
          >
            책 보러 가기
          </button>
        </Link>
      )}
    </div>
  );
};
export default ComplexResultPage;
