'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBookId, setImageUrls } from '@/store/bookSlice';
import apiService from '@/services/apiService';

interface ImageItem {
  imageUrl: string;
}

interface BookResponseData {
  _id: string;
  body: Record<string, ImageItem>;
}

interface FetchBookDataResult {
  bookId: string;
  imageUrls: string[];
  realImagesLoaded: boolean;
}

const useFetchBookData = (
  token: string | null,
  bookContent: string,
  initialBookId: string,
): FetchBookDataResult => {
  const [bookId, setLocalBookId] = useState<string>(initialBookId);
  const [imageUrls, setImageUrlsLocal] = useState<string[]>([]);
  const [realImagesLoaded, setRealImagesLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (realImagesLoaded || !bookContent || !bookId) {
      return;
    }
    const fetchBookData = async () => {
      try {
        const response = await apiService(`${process.env.NEXT_PUBLIC_API_URL}/ai/books`, {
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
          const responseData: BookResponseData = await response.json();
          setLocalBookId(responseData._id);
          dispatch(setBookId(responseData._id));
          const fetchedImageUrls = Object.values(responseData.body).map((item) => item.imageUrl);
          setImageUrlsLocal(fetchedImageUrls);
          dispatch(setImageUrls(fetchedImageUrls));
          setRealImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookContent, bookId, realImagesLoaded, token, dispatch]);

  return { bookId, imageUrls, realImagesLoaded };
};

export default useFetchBookData;
