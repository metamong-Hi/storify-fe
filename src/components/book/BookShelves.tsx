import React, { use, useCallback, useState } from 'react';
import BookSkeleton from '../skeleton/BookSkeleton';
import { BooksData } from '@/types/books';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { getAllBooks } from './AllBooks';
import { set } from 'lodash';
import { LikeIcon } from '@/components/icons/LikeIcon';

import { jwtDecode } from 'jwt-decode';
import { error } from 'console';

import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  _id: string;
  avatar: string;
  bookshelfLink: string;
  name: string;
}
interface userData extends BooksData {
  userId?: User;
}

BookShelves.propTypes = {
  books: PropTypes.array.isRequired,
  // ... other props
};
interface BookShelvesProps {
  books: Array<BooksData>;
  limit: number;
  search: string;
}

interface BookComponentProps {
  book: BooksData;
  index: number;
}

const Book = ({ book, index }: BookComponentProps) => {
  let token = '';

  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('token');
    token = storedToken && storedToken !== 'undefined' ? storedToken : '';
  }

  const whoIsLoggedIn = token ? jwtDecode(token) : null;
  const isInitiallyLiked = book.likes?.some((like) => like === whoIsLoggedIn?.sub);
  const [liked, setLiked] = useState<boolean>(isInitiallyLiked ?? false);
  const [likeCount, setLikeCount] = useState<number>(book.likes?.length || 0);

  const sendLikeRequestToServer = async (likeStatus: boolean) => {
    const method = likeStatus ? 'POST' : 'DELETE';
    const response = await fetch(`${API_URL}/api/books/${book._id}/likes`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to send like request to server');
    }

    return response.json();
  };

  const debouncedFunction = debounce(async (prevLiked: boolean) => {
    setLiked((prevLiked) => !prevLiked);
    setLikeCount((prevCount) => (prevLiked ? prevCount + 1 : prevCount - 1));

    try {
      await sendLikeRequestToServer(prevLiked);
    } catch (error) {
      // Revert state if the request fails
      setLiked((prevLiked) => !prevLiked);
      setLikeCount((prevCount) => (prevLiked ? prevCount + 1 : prevCount - 1));
      console.error('Failed to like/unlike the book:', error);
    }
  }, 300);

  const debouncedHandleLike = useCallback(() => {
    // Call the debounced function with the new like status
    debouncedFunction(!liked);
  }, [debouncedFunction, liked]);

  let imageURL;

  try {
    const noBookImg =
      book.coverUrl && (book.coverUrl.startsWith('http://') || book.coverUrl.startsWith('https://'))
        ? book.coverUrl
        : '/images/bookCover.png';
    imageURL = book.thumbnail ? book.thumbnail : noBookImg;
  } catch (error) {
    imageURL = '/images/bookCover.png';
  }

  let token = '';
  if (typeof window !== 'undefined') {
    // token = localStorage.getItem('token') ?? '';
    token = sessionStorage.getItem('token') ?? '';
  }

  const user = {
    _id: book.userId?._id,
    avatar:
      'https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png',
    bookshelfLink: `/user/${encodeURIComponent(book.userId?._id ?? '')}/bookshelf`, // Replace with actual link to user's bookshelf
    name: book.userId?.username ?? '', // Replace with actual user's name
  };

  return (
    <div
      key={index}
      className="bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-2xl"
    >
      <div className="object-center transition-transform duration-500 hover:scale-105">
        <Link as={`/book/${encodeURIComponent(book?._id ?? '')}`} href={''}>
          <Image
            src={imageURL}
            priority={true}
            alt="Book Cover Image"
            className="object-contain w-full h-full "
            height={200}
            width={200}
            quality={90} // 품질 설정
          />
        </Link>
      </div>

      <div className="p-4">
        <div className="truncate w-full text-lg md:text-xl lg:text-2xl font-bold">{book.title}</div>
        <div className="flex justify-between items-center mt-4 ">
          <Link href={user.bookshelfLink}>
            <div className="flex items-center rounded-4xl space-x-2 hover:bg-black/10">
              <div className="avatar">
                <div className="w-4 h-4 rounded-full">
                  <Image src={user.avatar} alt={`${user.name}'s Avatar`} width={5} height={5} />
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
              onClick={token ? debouncedHandleLike : undefined}
            >
              <HeartIcon
                className={`w-5 h-4 ${liked && token ? 'fill-current text-red-500' : 'text-gray-500'}`}
              />
            </button>
            <span className="text-sm">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookShelves({ books = [], limit, search }: BookShelvesProps) {
  return (
    <div className="flex justify-center p-5">
      {books?.length > 0 ? (
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
