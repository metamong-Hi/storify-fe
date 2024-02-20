'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import StoryDisplay from './StoryDisplay';
import ImageGallery from './ImageGallery';
import NavigateButton from './NavigationButton';
import Title from '../Title';
import useFetchBookData from '@/hooks/writing/useFetchBookData';

const SimpleResult: React.FC = () => {
  const bookContent = useSelector((state: RootState) => state.book.content);
  const BookId = useSelector((state: RootState) => state.book.bookId);
  const [showNavigateButton, setShowNavigateButton] = useState(false);
  const navigateButtonRef = useRef<HTMLDivElement>(null); 
  const imageGalleryRef = useRef<HTMLDivElement>(null); 
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }

  const { bookId, imageUrls, realImagesLoaded } = useFetchBookData(token, bookContent, BookId);

  useEffect(() => {
    if (realImagesLoaded) {
      setTimeout(() => {
        if (imageGalleryRef.current) {
          const scrollAmount = imageGalleryRef.current.offsetHeight;
          window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
        setShowNavigateButton(true);
      }, 2000);
    }
  }, [realImagesLoaded]);

  useEffect(() => {
    if (showNavigateButton && navigateButtonRef.current) {
      const scrollAmount = navigateButtonRef.current.offsetHeight;
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  }, [showNavigateButton]);
  
  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[75vw] xl:w-[70vw]">
      <Title line1="요정이 동화책을 만들고 있어요." line2="잠시만 기다려 주세요." />
      <div className="divider"></div>
      <StoryDisplay bookContent={bookContent} />
      <div className="divider"></div>
      <div ref={imageGalleryRef}>
        <ImageGallery imageUrls={imageUrls} realImagesLoaded={realImagesLoaded} />
      </div>
      <div ref={navigateButtonRef}>
        {showNavigateButton && <NavigateButton bookId={bookId} />}
      </div>
    </div>
  );
};

export default SimpleResult;
