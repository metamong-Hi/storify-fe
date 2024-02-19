"use client"
import { useState } from 'react';
import Swal from 'sweetalert2';

interface FeedbackParams {
  text: string;
  token: string | null;
}

interface SubmitFeedbackResult {
  isSubmitted: boolean;
  error: string | null;
}

const useSubmitFeedback = (): [(params: FeedbackParams) => Promise<void>, SubmitFeedbackResult] => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = async ({ text, token }: FeedbackParams): Promise<void> => {
    if (!token) {
      setError('No token provided');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: '피드백 : ' + text }),
      });

      if (response.status === 201) {
        setIsSubmitted(true);
        setError(null);
      } else {
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
    } catch (error: any) {
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
    } finally {
    }
  };

  return [submitFeedback, { isSubmitted, error }];
};

export default useSubmitFeedback;
