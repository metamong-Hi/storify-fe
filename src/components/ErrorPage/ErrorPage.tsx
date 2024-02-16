// pages/404.tsx
import Link from 'next/link';
import React from 'react';

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">페이지를 찾을 수 없습니다.</h1>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        <p>홈으로</p>
      </Link>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        <p>책장으로</p>
      </Link>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        <p>책 만들기</p>
      </Link>
    </div>
  );
};

export default Custom404;
