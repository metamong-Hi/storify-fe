'use client';

import React, { use, useCallback, useEffect, useState } from 'react';
import BookSkeleton from '../skeleton/BookSkeleton';
import { BooksData } from '@/types/books';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { getAllBooks } from './AllBooks';
import { set } from 'lodash';
import { LikeIcon } from '@/components/icons/LikeIcon';
import { XIcon } from '@/components/icons/XIcon';

import useSessionStorage from '@/hooks/useSessionStorage';

import { jwtDecode } from 'jwt-decode';
import { error } from 'console';

import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { useAppSelector } from '@/hooks/useAppSelector';

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

async function getUserProfile(_id: string) {
  const response = await fetch(`${API_URL}/users/${_id}`, {
    method: 'GET',
  });

  return response.json();
}

export const Book = ({ book, index }: BookComponentProps) => {
  const token = useSessionStorage('token');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(book.likesCount);
  const [likeError, setLikeError] = useState(false);

  const sendLikeRequestToServer = async (likeStatus: boolean) => {
    try {
      const method = likeStatus ? 'POST' : 'DELETE';
      const response = await fetch(`${API_URL}/books/${book._id}/likes`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to send like request to server');
      }

      setLikeError(false); // Reset error state on success
      return await response.json();
    } catch (error) {
      setLikeError(true); // Set error state to true on failure

      setTimeout(() => {
        setLikeError(false); // Revert error state after 2 seconds
      }, 1000);

      throw error;
    }
  };

  const debouncedFunction = debounce(async (prevLiked: boolean) => {
    try {
      const response = await sendLikeRequestToServer(prevLiked);
      setLikeCount(response.likesCount);
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error('Failed to like/unlike the book:', error);
    }
  }, 300);

  const debouncedHandleLike = useCallback(() => {
    debouncedFunction(!liked);
  }, [debouncedFunction, liked]);

  useEffect(() => {
    let log = token ? jwtDecode(token) : null;
    let isLiked = book.likes?.some((like) => like === log?.sub);
    setLiked(isLiked ?? false);
    setLikeCount(book.likesCount);
  }, [book, token]);

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

  const user = {
    _id: book.userId?._id,
    avatar:
      book.userId?.avatar ??
      'https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png',
    bookshelfLink: `/user/${encodeURIComponent(book.userId?._id ?? '')}/bookshelf`, // Replace with actual link to user's bookshelf
    name: book.userId?.userId ?? '', // Replace with actual user's name
  };

  const openLoginModal = () => {
    const modal = document.getElementById('authModal');
    if (modal) {
      const modalElement = document.getElementById('authModal') as HTMLDialogElement;
      modalElement.showModal();
    }
  };

  return (
    <div
      key={index}
      className="bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-2xl"
    >
      <div className="object-center transition-transform duration-500 hover:scale-105 w-[280px] h-[280px]">
        <Link as={`/book/${encodeURIComponent(book?._id ?? '')}`} href={''}>
          <Image
            src={imageURL}
            priority={true}
            alt="Book Cover Image"
            className="object-contain w-full h-full "
            height={200}
            width={200}
            quality={90}
          />
        </Link>
      </div>

      <div className="p-4">
        <div className="flex truncate justify-center text-align-center">
          <div className="flex justify-center text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-base-content">
            <div className="text-center w-[250px]">{book.title}</div>
          </div>
        </div>
        <div className=" flex justify-between items-center mt-4 ">
          <div className="dropdown dropdown-top flex justify-start items-center">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center rounded-4xl space-x-2 hover:bg-black/10 cursor-pointer"
              onClick={
                token
                  ? () => console.log('User profile link')
                  : () => {
                      alert('로그인이 필요합니다.');
                    }
              }
            >
              <div className="avatar">
                <div className="w-4 h-4 rounded-full">
                  <Image src={user.avatar} alt={`${user.name}'s Avatar`} width={5} height={5} />
                </div>
              </div>
              <span className="text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl font-semibold text-base-content">
                {user.name}
              </span>
            </div>
            <ul
              tabIndex={0}
              className={`${
                token ? '' : 'hidden'
              } dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52`}
            >
              <Link href={user.bookshelfLink}>
                <li className="rounded-t hover:bg-base-300 py-2 px-4 block whitespace-no-wrap text-base-content">
                  책장 보기
                </li>
              </Link>

              <li className="rounded-t hover:bg-base-200 py-2 px-4 block whitespace-no-wrap text-base-content">
                친구 추가
              </li>
            </ul>
          </div>

          <div className="flex justify-end items-center mt-1">
            <div className="flex items-center space-x-2">
              <EyeIcon className="w-4 h-4 text-gray-500" />
              <span className="text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content">
                {book.count}
              </span>
            </div>
            <div className="flex items-center  ml-2">
              <button
                className={`btn btn-ghost btn-circle btn-sm  ${
                  token ? '' : 'hover:bg-transparent hover:text-current'
                }`}
                onClick={
                  token
                    ? debouncedHandleLike
                    : () => {
                        alert('로그인이 필요합니다.');
                      }
                }
              >
                {likeError ? (
                  <span>
                    <XIcon />
                  </span>
                ) : (
                  // Assume XIcon is your error icon
                  <HeartIcon
                    height={20}
                    width={20}
                    className={`${
                      liked && token && !likeError ? 'fill-current text-red-500' : 'text-gray-500'
                    }`}
                  />
                )}
              </button>

              <span className="text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl text-base-content">
                {likeCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookShelves({ books = [], limit, search }: BookShelvesProps) {
  return (
    <>
      {books.map((book, index) => (
        <Book key={index} book={book} index={index} />
      ))}
    </>
  );
}
