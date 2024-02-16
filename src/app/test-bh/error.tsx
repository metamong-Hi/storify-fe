
'use client' 
 
import { useEffect } from 'react'
import ErrorPage from '@/components/ErrorPage/ErrorPage';
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <ErrorPage />
      <button
        onClick={
          () => reset()
        }
      >
        다시 시도
      </button>
    </div>
  )
}