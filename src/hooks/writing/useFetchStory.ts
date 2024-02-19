"use client"
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setBookContent, setBookId } from '@/store/bookSlice';
import { resetText } from '@/store/textSlice';

interface UseFetchStoryProps {
  text: string;
  token: string | null;
}

interface UseFetchStoryReturn {
  isSuccess: boolean;
  fetchStory: () => Promise<void>;
}

export const useFetchStory = ({ text, token }: UseFetchStoryProps): UseFetchStoryReturn => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchStory = useCallback(async () => {
    if (!text || !token) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setBookContent(data.content));
        dispatch(setBookId(data.story._id));
        setIsSuccess(true);
        dispatch(resetText());
      } else {
        // Assuming you want to handle the not-ok response differently
        // For example, setting isSuccess to false
        setIsSuccess(false);
        console.error('Submission failed. Please try again.');
      }
    } catch (error) {
      setIsSuccess(false);
      console.error('An error occurred. Please try again.');
    }
  }, [dispatch, text, token]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  return { isSuccess, fetchStory };
};
