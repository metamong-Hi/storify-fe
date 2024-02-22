'use client';

import React, { useState, useEffect, useRef } from 'react';
import BookShelves from '@/components/book/BookShelves';

import Pagination from '@/components/Pagination';
import { SearchIcon } from '@/components/icons/SearchIcon';
import useBooksData from '@/hooks/useBooksData';
import usePagination from '@/hooks/usePagination';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import { BooksData } from '@/types/books';
import { set } from 'lodash';

interface UseBooksDataProps {
  userId: string;
  type: string;
}
interface BookListProps {
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

const BooksPage: React.FC<UseBooksDataProps> = ({ userId, type }: UseBooksDataProps) => {
  const sortOptions = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'like' },
    { label: '조회순', value: 'count' },
  ];
  const [otherNickname, setOtherNickname] = useState('');
  const [shelfTitle, setShelfTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let id = '';
      if (typeof window !== 'undefined' && userId) {
        const token = sessionStorage.getItem('token');
        if (token) {
          id = jwtDecode(token)?.sub as string;
          if (id !== userId) {
            const data = await getOtherUserId(userId);
            setOtherNickname(data.nickname);
          }
        }
      }
      setShelfTitle(userId ? (id === userId ? '내 책장' : `${otherNickname}님의 책장`) : '');
    };

    fetchData();
  }, [userId, otherNickname]);

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
    type: type,
  });
  const [filteredBooks, setFilteredBooks] = useState<BooksData[]>([]);

  useEffect(() => {
    if (type === 'liked') {
      let processedBooks = bookShelves;

      if (search) {
        processedBooks = processedBooks.filter((book) =>
          book.title?.toLowerCase().includes(search.toLowerCase()),
        );
      }

      if (sortBy === 'like') {
        processedBooks.sort((a, b) => {
          const aCount = a.likesCount && a.likesCount > 0 ? a.likesCount : a.likes?.length ?? 0;
          const bCount = b.likesCount && b.likesCount > 0 ? b.likesCount : b.likes?.length ?? 0;

          return bCount - aCount;
        });
      } else if (sortBy === 'count') {
        processedBooks.sort((a, b) => ((b.count ?? 0) as number) - ((a.count ?? 0) as number));
      } else {
        processedBooks.sort((a, b) => {
          const dateA = new Date(a.createdAt ?? '');
          const dateB = new Date(b.createdAt ?? '');
          return dateB.getTime() - dateA.getTime();
        });
      }

      setFilteredBooks(processedBooks);
    }
  }, [bookShelves, search, sortBy, type]);

  const { totalPage, paginate } = usePagination({
    totalItems: type === 'liked' ? filteredBooks.length : totalItems,
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
      <div className="flex flex-col w-full pl-[4vw] pr-[4vw]">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full py-8 ">
          <div role="tablist" className="tabs tabs-lifted relative justify-start mb-4 sm:mb-0">
            {sortOptions.map((option) => (
              <a
                role="tab"
                key={option.value}
                className={`tab whitespace-nowrap text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl ${sortBy === option.value ? 'tab-active' : ''}`}
                onClick={() => handleSortBy(option.value)}
              >
                <span className="p-1">{option.label}</span>
              </a>
            ))}
          </div>
          <div
            className={`${userId ? '' : 'hidden'} flex justify-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl p-5`}
          >
            {shelfTitle}
          </div>

          <div className="relative justify-end ">
            <div className="flex border-2 rounded-full">
              <input
                className="form-input w-full bg-transparent py-1 sm:py-2 px-3 text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl focus:outline-none"
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
                <SearchIcon size={30} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-1 md:gap-4 2xl:gap-8">
            <BookShelves
              books={type === 'liked' ? filteredBooks : bookShelves}
              limit={limit}
              search={search}
            />
          </div>
        <div className="mt-10">
          <div className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl ">
            <Pagination totalPage={totalPage} currentPage={currentPage} paginate={paginate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksPage;
