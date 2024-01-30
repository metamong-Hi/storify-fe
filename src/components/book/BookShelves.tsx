import React from 'react';
import BookSkeleton from '../skeleton/BookSkeleton';
import { BooksData } from '@/types/books';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { getAllBooks } from './AllBooks';
import { set } from 'lodash';
import { LikeIcon } from '@/components/icons/LikeIcon';

interface BookShelvesProps {
  books: BooksData[];
  search: string;
  limit: number;
}

interface BookProps {
  book: BooksData;
  index: number;
}

const Book = ({ book, index }: BookProps) => {
  const [liked, setLiked] = React.useState(false);
  let imageURL;

  try {
    const body = book.body || null;
    const noBookImg = body ? body[1].imageUrl : '/images/bookCover.png';
    const isValidCoverUrl =
      book.coverUrl &&
      (book.coverUrl.startsWith('http://') || book.coverUrl.startsWith('https://'));
    imageURL = isValidCoverUrl ? book.coverUrl : noBookImg;
  } catch (error) {
    imageURL = '/images/bookCover.png';
  }

  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') ?? '';
  }

  const user = {
    avatar: '/images/bookCover.png', // Replace with actual path to user's avatar
    bookshelfLink: `/user/${encodeURIComponent(book.userId?._id ?? '')}/bookshelf`, // Replace with actual link to user's bookshelf
    name: book.userId?.username ?? '', // Replace with actual user's name
  };

  return (
    <div
      key={index}
      className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
    >
      <div className="transition-transform duration-500 hover:scale-105">
        <Link href={`/book/${encodeURIComponent(book?._id ?? '')}`}>
          <Image
            src={imageURL ?? ''}
            alt="Book Cover Image"
            height={400} // Adjust the height to match your design
            width={400} // Adjust the width to match your design
          />
        </Link>
      </div>

      <div className="p-4">
        <div className="truncate w-full text-lg md:text-xl lg:text-2xl font-bold">{book.title}</div>
        <div className="flex justify-between items-center mt-4">
          <Link href={user.bookshelfLink}>
            <div className="flex items-center space-x-2">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full">
                  <Image src={user.avatar} alt={`${user.name}'s Avatar`} />
                </div>
              </div>
              <span className="text-sm font-semibold">{user.name}</span>
            </div>
          </Link>
        </div>

        <div className="flex justify-end items-center mt-1">
          <div className="flex items-center space-x-2">
            <EyeIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{book.rate}</span>
          </div>
          <div className="flex items-center ml-2">
            <button
              className={`btn btn-ghost btn-circle btn-sm ${
                token ? '' : 'hover:bg-transparent hover:text-current'
              }`}
              onClick={token ? () => setLiked(!liked) : undefined}
            >
              <HeartIcon
                className={`w-5 h-4 ${liked && token ? 'fill-current text-red-500' : 'text-gray-500'}`}
              />
            </button>

            <span className="text-sm">{book.count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookShelves({ books, limit, search }: BookShelvesProps) {
  return (
    <div className="flex justify-center p-5">
      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map((book, index) => (
            <Book key={index} book={book} index={index} />
          ))}
        </div>
      ) : search ? (
        <span>검색 결과 : &quot;{search}&quot; 없음.</span>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <BookSkeleton cnt={limit} />
        </div>
      )}
    </div>
  );
}
