import dynamic from 'next/dynamic';
import React from 'react';

const BookListWithNoSSR = dynamic(() => import('@/components/book/BookList'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="p-20">
        <BookListWithNoSSR userId="" />
        <BookListWithNoSSR userId="" />
        <BookListWithNoSSR userId="" />
      </div>
    </div>
  );
}
