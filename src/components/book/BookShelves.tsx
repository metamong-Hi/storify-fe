'use client';

import React, { use, useCallback, useEffect, useState } from 'react';
import BookSkeleton from '../skeleton/BookSkeleton';
import { BooksData, userData } from '@/types/books';
import io from 'socket.io-client';
import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { EyeIcon } from '@/components/icons/EyeIcon';
import { getAllBooks } from './AllBooks';
import { get, set } from 'lodash';
import { LikeIcon } from '@/components/icons/LikeIcon';
import { XIcon } from '@/components/icons/XIcon';

import useSessionStorage from '@/hooks/useSessionStorage';

import { jwtDecode } from 'jwt-decode';
import { error } from 'console';

import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { useAppSelector } from '@/hooks/useAppSelector';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import { getSocket, initializeWebSocket } from '@/utils/websocket';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProfileProps {
  _id: string;
  avatar: string;
  name: string;
  bookshelfLink: string;
  likedBooksLink: string;
  userId: string;
  introduction: string;
}

interface UserProps {
  _id: string;
  password: string;
  email: string;
  createdAt: Date;
  __v: number;
  refreshToken: string;
  userId: string;
  nickname: string;
}

interface UserProfileProps {
  _id: string;
  userId: string;
  nickname: string;
  avatar: string;
  introduction: string;
}

BookShelves.propTypes = {
  books: PropTypes.array.isRequired,
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
  if (!_id) {
    return;
  }
  const response = await fetch(`${API_URL}/users/profile/${_id}`, {
    method: 'GET',
  });

  return response.json();
}

async function getUserIdtoProfile(_id: string) {
  if (!_id) {
    return;
  }
  const response: UserProps = await fetch(`${API_URL}/users/${_id}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error:', error);
    });

  const response2 = await getUserProfile(response.userId);

  return response2;
}

export const Book = ({ book, index }: BookComponentProps) => {
  const token = useSessionStorage('token');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(book.likesCount ?? book.likes?.length);
  const [likeError, setLikeError] = useState(false);
  const [user, setUser] = useState<ProfileProps>({
    _id: '',
    avatar: '',
    bookshelfLink: '',
    likedBooksLink: '',
    name: '',
    userId: '',
    introduction: '',
  });

  const theme = useSelector((state: RootState) => state.theme.value);

  const isWhiteIconTheme = [
    'luxury',
    'dark',
    'coffee',
    'night',
    'halloween',
    'sunset',
    'synthwave',
    'forest',
    'black',
    'dracula',
    'business',
  ].includes(theme);
  const iconFilter = isWhiteIconTheme ? 'invert(100%)' : 'none';

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
      const socket = getSocket();

      setLikeError(false);

      if (socket) {
        socket.emit('like', { bookId: book._id });
      }
      return await response.json();
    } catch (error) {
      setLikeError(true);

      setTimeout(() => {
        setLikeError(false);
      }, 1000);

      throw error;
    }
  };

  const debouncedFunction = debounce(async (prevLiked: boolean) => {
    try {
      const response = await sendLikeRequestToServer(prevLiked);
      if (response.likesCount) setLikeCount(response.likesCount);
      else if (response.likes) setLikeCount(response.likes.length);
      else setLikeCount(0);

      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error('Failed to like/unlike the book:', error);
    }
  }, 500);

  const debouncedHandleLike = useCallback(() => {
    debouncedFunction(!liked);
  }, [debouncedFunction, liked]);

  useEffect(() => {
    let log = token ? jwtDecode(token) : null;
    let isLiked = book.likes?.some((like) => like === log?.sub);
    setLiked(isLiked ?? false);
    if (book.likesCount) setLikeCount(book.likesCount);
    else if (book.likes) setLikeCount(book.likes.length);
    else setLikeCount(0);
  }, [book, token]);

  let imageURL;

  try {
    const noBookImg =
      book.coverUrl && (book.coverUrl.startsWith('http://') || book.coverUrl.startsWith('https://'))
        ? book.coverUrl
        : 'https://s3.ap-northeast-2.amazonaws.com/storify/public/bookCover-1708421769163.png';
    imageURL = book.thumbnail ? book.thumbnail : noBookImg;
  } catch (error) {
    imageURL = 'https://s3.ap-northeast-2.amazonaws.com/storify/public/bookCover-1708421769163.png';
  }

  useEffect(() => {
    const fetchData = async () => {
      const setData = async (): Promise<UserProfileProps> => {
        if (typeof book.userId === 'string') {
          const data = await getUserIdtoProfile(book.userId);
          setUser(data);
          return data;
        } else {
          const data = await getUserProfile(book.userId?.userId ?? '');
          setUser(data);
          return data;
        }
      };

      const data = await setData();

      const _id = typeof book.userId === 'string' ? book.userId : book.userId?._id ?? '';

      const user: ProfileProps = {
        _id: _id,
        avatar: data.avatar
          ? data.avatar
          : 'https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png',
        bookshelfLink: `/user/${encodeURIComponent(_id)}/bookshelf`,
        name: data.nickname ?? data.userId,
        userId: data.userId,
        introduction: data.introduction,
        likedBooksLink: `/user/${encodeURIComponent(_id)}/liked-books`,
      };
      setUser(user);
    };

    fetchData();
  }, [book]);
  useEffect(() => {
    const userToken = sessionStorage.getItem('token');
    if (userToken) {
      initializeWebSocket(userToken);
    }
  }, []);
  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      //socket.emit('like', { bookId: book._id });

      //여긴 유지
      // socket.on('like', (data) => {
      //   if (data.bookId === book._id) {
      //     console.log('Your book has received a like!',data);
      //     alert(`${data.message}`);
      //   }
      // });
    }

    return () => {
      if (socket) socket.off('like');
    };
  }, [book._id]);
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
            loading="eager"
            src={imageURL}
            priority={true}
            alt="Book Cover Image"
            className="object-contain w-full h-full "
            height={256}
            width={256}
            quality={90}
          />
        </Link>
      </div>

      <div className="p-4">
        <div className="flex truncate justify-center text-align-center">
          <div className="flex justify-center text-md sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-base-content">
            <div className="text-center w-[240px]">{book.title}</div>
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
                <div className="w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 rounded-full">
                  <Image
                    src={user.avatar}
                    alt={`${user.name}'s Avatar`}
                    width={128}
                    height={128}
                    style={{ filter: iconFilter }}
                  />
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
              } dropdown-content z-10 menu p-2 shadow bg-base-200 rounded-box w-52`}
            >
              <Link href={user.bookshelfLink}>
                <li className="rounded-t hover:bg-base-300 py-2 px-4 block whitespace-no-wrap text-base-content">
                  책장 보기
                </li>
              </Link>
              <Link href={user.likedBooksLink}>
                <li className="rounded-t hover:bg-base-300 py-2 px-4 block whitespace-no-wrap text-base-content">
                  선호작 보기
                </li>
              </Link>

              {/* <li className="rounded-t hover:bg-base-200 py-2 px-4 block whitespace-no-wrap text-base-content">
                친구 추가
              </li> */}
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
                  <HeartIcon
                    height={128}
                    width={128}
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
