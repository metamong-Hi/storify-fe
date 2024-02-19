// useFetchBookData.ts
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBookId, setImageUrls } from '@/store/bookSlice';

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
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [token, bookContent, bookId, dispatch]);

  return { isLoading, error };
};
