import React from 'react';
import BookSkeleton from '../skeleton/BookSkeleton';
import { BooksData } from '@/types/books';

import bookCover from '../../../public/images/bookCover.png';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { getAllBooks } from './AllBooks';
import { set } from 'lodash';

interface BookShelvesProps {
  currentPage: number;
  limit: number;
  search: string;
  sortBy: string;
}

interface BookProps {
  book: BooksData;
  index: number;
}

const Book = ({ book, index }: BookProps) => {
  const [liked, setLiked] = React.useState(false);
  let imageURL;
  // console.log(book);

  try {
    const body = book.body || null;
    const noBookImg = body ? body[1].imageUrl : bookCover;
    const isValidCoverUrl =
      book.coverUrl &&
      (book.coverUrl.startsWith('http://') || book.coverUrl.startsWith('https://'));
    imageURL = isValidCoverUrl ? book.coverUrl : noBookImg;
  } catch (error) {
    imageURL = bookCover;
  }

  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') ?? '';
  }

  const user = {
    avatar: bookCover, // Replace with actual path to user's avatar
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
        <div className="flex justify-between items-center mt-2">
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
          <button className="btn btn-ghost btn-circle" onClick={() => setLiked(!liked)}>
            <HeartIcon
              className={`w-6 h-6 ${liked ? 'fill-current text-red-500' : 'text-gray-500'}`}
            />
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm">{book.rate} views</span>
          <span className="text-sm">{book.count} likes</span>
        </div>
      </div>
    </div>
  );
};

export default function BookShelves({ currentPage, limit, search, sortBy }: BookShelvesProps) {
  const [books, setBooks] = React.useState<BooksData[]>([]);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks(currentPage, limit, sortBy, search);
        console.log(data);
        setBooks(data.books);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, [currentPage, limit, sortBy, search]);

  // Fetch books when component mounts or when currentPage, limit, sortBy, or search changes

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
