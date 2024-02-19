"use client";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import StoryDisplay from './StoryDisplay';
import ImageGallery from './ImageGallery';
import NavigateButton from './NavigationButton';
import Title from '../Title';
import { useFetchBookData } from '@/hooks/writing/useFetchBookData';

const SimpleResult: React.FC = () => {
  const bookContent = useSelector((state: RootState) => state.book.content);
  const bookId = useSelector((state: RootState) => state.book.bookId);
  const imageUrls = useSelector((state: RootState) => state.book.imageUrls);
  const [realImagesLoaded, setRealImagesLoaded] = useState(false);
  const [showNavigateButton, setShowNavigateButton] = useState(false);

  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('token');
  }

  const { isLoading, error } = useFetchBookData(token, bookContent, bookId);

  useEffect(() => {
    const loadImages = async () => {
      setTimeout(() => {
        setRealImagesLoaded(true);
        setShowNavigateButton(true);
      }, 2000);
    };

    if (bookContent && bookId) {
      loadImages();
    }
  }, [bookContent, bookId]);

  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[75vw] xl:w-[70vw]">
      <Title line1="요정이 동화책을 만들고 있어요." line2="잠시만 기다려 주세요." />
      <div className="divider"></div>
      <StoryDisplay bookContent={bookContent} />
      <div className="divider"></div>
      <ImageGallery imageUrls={imageUrls} realImagesLoaded={realImagesLoaded} />
      {showNavigateButton && <NavigateButton bookId={bookId} />}
    </div>
  );
};

export default SimpleResult;
