"use client"
import React, { useRef } from 'react';
import Link from 'next/link';

interface NavigateButtonProps {
  bookId: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ bookId }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Link href={`/book/${bookId}`} passHref>
      <button ref={buttonRef} className="btn btn-primary font-bold border-2 mt-4">
        책 보러 가기
      </button>
    </Link>
  );
};

export default NavigateButton;
