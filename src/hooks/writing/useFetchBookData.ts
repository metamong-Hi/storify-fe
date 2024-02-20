"use client";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBookId, setImageUrls } from '@/store/bookSlice';
import Swal from 'sweetalert2';

interface BookResponseData {
  _id: string;
  body: Record<string, ImageItem>;
}

interface ImageItem {
  imageUrl: string;
}

export const useFetchBookData = (token: string | null, bookContent: string, bookId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookData = async () => {
      if (!token || !bookContent || !bookId) return;

      setIsLoading(true);
      setError(null);

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

        if (!response.ok) {
          throw new Error('Fetching book data failed');
        }

        const responseData: BookResponseData = await response.json();
        dispatch(setBookId(responseData._id));
        const imageUrls = Object.values(responseData.body).map(item => item.imageUrl);
        dispatch(setImageUrls(imageUrls));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '책 불러오기가 실패했어요. 다시 시도해보세요';
        setError(errorMessage);
        Swal.fire({ 
          icon: 'error',
          title: '에러 발생',
          text: errorMessage,
          confirmButtonText: '확인',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [token, bookContent, bookId, dispatch]);

  return { isLoading, error };
};
