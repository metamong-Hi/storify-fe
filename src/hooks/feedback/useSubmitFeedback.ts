import { useState } from 'react';

interface SubmitFeedbackResult {
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const useSubmitFeedback = (token: string | null): [SubmitFeedbackResult, (text: string) => Promise<void>] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = async (text: string): Promise<void> => {
    if (!token) {
      setError('No token provided');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
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
      setIsLoading(false);
    }
  };

  return [{ isLoading, isSubmitted, error }, submitFeedback];
};

export default useSubmitFeedback;
