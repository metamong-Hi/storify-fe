'use client';
import ErrorPage from '@/components/ErrorPage/ErrorPage';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <ErrorPage />
        <button onClick={() => reset()}>다시 시도</button>
      </body>
    </html>
  );
}
