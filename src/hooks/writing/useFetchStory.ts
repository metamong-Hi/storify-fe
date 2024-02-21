"use client"
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setBookContent, setBookId } from '@/store/bookSlice';
import { resetText } from '@/store/textSlice';
import Swal from 'sweetalert2'; 
import apiService from '@/services/apiService';

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
      const response = await apiService(`${process.env.NEXT_PUBLIC_API_URL}/ai/stories`, {
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
        setIsSuccess(false);
        Swal.fire({
          icon: 'error',
          title: '에러 발생',
          text: '제출이 실패했어요. 다시 시도해보세요',
          confirmButtonText: '확인',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      setIsSuccess(false);
      Swal.fire({
        icon: 'error',
        title: '에러 발생',
        text: '제출이 실패했어요. 다시 시도해보세요',
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      });
    }
  }, [dispatch, text, token]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  return { isSuccess, fetchStory };
};
