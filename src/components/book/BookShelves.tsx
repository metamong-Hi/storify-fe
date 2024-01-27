import React from 'react';
import Book from './Book';
import BookSkeleton from '../skeleton/BookSkeleton';
import { BooksData } from '@/types/books';

interface BookShelvesProps {
  books: BooksData[];
  limit: number;
}

export default function BookShelves({ books, limit }: BookShelvesProps) {
  console.log(books);
  return (
    <div className="bg-white-100 p-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {books.length > 0 ? (
          books.map((book, index) => <Book key={index} Book={book} index={index} />)
        ) : (
          <BookSkeleton cnt={limit} />
        )}
      </div>
    </div>
  );
}
