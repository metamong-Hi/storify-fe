"use client"
import { useState } from 'react';

interface FeedbackParams {
  text: string;
  token: string | null;
}

interface SubmitFeedbackResult {
  isSubmitted: boolean;
  error: string | null;
}

// Adjust the hook to accept an object with text and token
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
        setError('Failed to submit feedback');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
    }
  };

  return [submitFeedback, { isSubmitted, error }];
};

export default useSubmitFeedback;
