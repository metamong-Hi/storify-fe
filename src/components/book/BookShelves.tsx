import React from 'react';
import Book from './Book';
import BookSkeleton from '../skeleton/BookSkeleton';
import { BooksData } from '@/types/books';

interface BookShelvesProps {
  books: BooksData[];
  limit: number;
  search: string;
}

export default function BookShelves({ books, limit, search }: BookShelvesProps) {
  return (
    <div className="flex justify-center p-5">
      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map((book, index) => (
            <Book key={index} Book={book} index={index} />
          ))}
        </div>
      ) : search ? (
        <p className="">검색 결과 : &quot;{search}&quot; 없음.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <BookSkeleton cnt={limit} />
        </div>
      )}
    </div>
  );
}
