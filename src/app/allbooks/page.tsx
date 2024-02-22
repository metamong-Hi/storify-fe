import dynamic from 'next/dynamic';
import React from 'react';

const DynamicBooksPage = dynamic(() => import('@/components/book/BooksPage'), {
  ssr: false,
});

const Page = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <DynamicBooksPage userId="" type="" />
    </div>
  );
};

export default Page;
