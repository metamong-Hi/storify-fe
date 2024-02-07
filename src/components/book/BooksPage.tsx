'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import BookShelves from '@/components/book/BookShelves';
import { GetParams, getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { Tabs, Tab, user } from '@nextui-org/react';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';

import Pagination from '@/components/Pagination';
import { SearchIcon } from '@/components/icons/SearchIcon';
import useBooksData from '@/hooks/useBooksData';
import usePagination from '@/hooks/usePagination';
import { jwtDecode } from 'jwt-decode';

interface UseBooksDataProps {
  userId: string;
}

interface userIDProps {
  _id: string;
  nickname: string;
  userId: string;
}

async function GET(url: string): Promise<userIDProps> {
  try {
    return (await fetch(url, { cache: 'no-store' })).json();
  } catch (error: any) {
    return error.message;
  }
}

async function getOtherUserId(userId: string) {
  const response = await GET(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`);
  return response;
}

const BooksPage = ({ userId }: UseBooksDataProps) => {
  const sortOptions = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'like' },
    { label: '조회순', value: 'count' },
  ];

  let nickname = '';
  let id = '';
  const [otherNickname, setOtherNickname] = useState('');

  if (typeof window !== 'undefined' && userId) {
    id = jwtDecode(sessionStorage.getItem('token') || '')?.sub as string;
    const getDatas = async () => {
      const data = await getOtherUserId(userId);
      setOtherNickname(data.nickname);
    };
    getDatas(); // Await the promise to resolve
    nickname = sessionStorage.getItem('nickname') || '';
    console.log('nickname', otherNickname);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState<number>(24);
  const [writeSearch, setWriteSearch] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);

  const { bookShelves, totalItems, isLoading } = useBooksData({
    currentPage,
    limit,
    sortBy,
    search,
    userId: userId,
  });

  const { totalPage, paginate } = usePagination({
    totalItems,
    itemsPerPage: limit,
    onPageChange: setCurrentPage,
  });

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWriteSearch(e.target.value);
  };

  const handleSearch = () => {
    setSearch(writeSearch);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div
            role="tablist"
            className="tabs tabs-lifted flex justify-start p-5 sm:px-5 md:px-8 lg:px-10 xl:px-20 2xl:px-32"
          >
            {sortOptions.map((option) => (
              <a
                role="tab"
                key={option.value}
                className={`tab ${sortBy === option.value ? 'tab-active' : ''}`}
                onClick={() => handleSortBy(option.value)}
              >
                {option.label}
              </a>
            ))}
          </div>
          <div className="flex justify-center p-5">
            {userId ? (userId === id ? '내 책장' : `${otherNickname} 님의 책장`) : ''}{' '}
          </div>

          <div className="flex justify-end p-5 sm:px-5 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
            <div className="flex border-2 rounded-full pl-3 pr-2">
              <input
                className="form-input w-full bg-transparent py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none"
                id="search"
                type="search"
                placeholder="검색어를 입력하세요."
                value={writeSearch}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <button
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={handleSearch}
              >
                <SearchIcon size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 px-5 sm:px-5 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
            <BookShelves books={bookShelves} limit={limit} search={search} />
          </div>
        </div>
        <div className="pt-8">
          <Pagination totalPage={totalPage} currentPage={currentPage} paginate={paginate} />
        </div>
      </div>
    </>
  );
};

export default BooksPage;
