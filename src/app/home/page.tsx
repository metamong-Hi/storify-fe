'use client';


import BookList from '@/components/book/BookList';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className=" p-20">
        <BookList userId="" />
        <BookList userId="" />
        <BookList userId="" />
      </div>
    </div>
  );
}
