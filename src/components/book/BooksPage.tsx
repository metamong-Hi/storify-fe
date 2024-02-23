'use client';

import React, { useState, useEffect } from 'react';
import BookShelves from '@/components/book/BookShelves';

import Pagination from '@/components/Pagination';
import { SearchIcon } from '@/icons/SearchIcon';
import useBooksData from '@/hooks/useBooksData';
import usePagination from '@/hooks/usePagination';
import { jwtDecode } from 'jwt-decode';
import { BooksData } from '@/types/books';
import { getUserInfo } from '@/services/userService';
import ResetIcon from '@/icons/ResetIcon';
import { ProfileData } from '@/types/user';

interface UseBooksDataProps {
  userId: string;
  type: string;
}

const BooksPage: React.FC<UseBooksDataProps> = ({ userId, type }: UseBooksDataProps) => {
  const sortOptions = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'like' },
    { label: '조회순', value: 'count' },
  ];

  const [shelfTitle, setShelfTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data: ProfileData | null = await getUserInfo(userId);
      if (userId) {
        if (type === 'liked') {
          setShelfTitle('좋아요한 책장');
        } else if (typeof window !== 'undefined') {
          const token = sessionStorage.getItem('token');
          const decoded = token ? jwtDecode(token) : null;
          setShelfTitle(
            decoded && decoded.sub === userId ? '내 책장' : `${data?.nickname} 님의 책장`,
          );
        } else {
          setShelfTitle(`${data?.nickname} 님의 책장`);
        }
      } else {
        setShelfTitle('전체 책장');
      }
    };

    fetchData();
  }, [type, userId]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState<number>(24);
  const [writeSearch, setWriteSearch] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);

  const { bookShelves, totalItems, isLoading } = useBooksData({
    currentPage,
    limit,
    sortBy: sortBy,
    search: search,
    userId: userId,
    type: type,
  });
  const [filteredBooks, setFilteredBooks] = useState<BooksData[]>([]);

  useEffect(() => {
    if (type === 'liked') {
      let processedBooks: BooksData[] = bookShelves;

      if (search) {
        processedBooks = processedBooks.filter((book) =>
          book.title?.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (Array.isArray(processedBooks)) {
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
          <div role="tablist" className="tabs tabs-bordered relative justify-start mb-4 sm:mb-0">
            {sortOptions.map((option) => (
              <a
                role="tab"
                key={option.value}
                className={`tab whitespace-nowrap text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl ${sortBy === option.value ? 'tab-active' : ''}
                hover:bg-base-300`}
                onClick={() => handleSortBy(option.value)}
              >
                <span className="p-1">{option.label}</span>
              </a>
            ))}
          </div>
          <div
            className={`flex justify-center text-base-content text-md sm:text-md md:text-lg lg:text-xl xl:text-3xl 2xl:text-3xl p-5`}
          >
            {shelfTitle}
          </div>

          <div className="relative justify-end ">
            <div className="flex flex-row border-2 rounded-full focus-within:border-primary">
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
                className="p-2 text-base-content rounded-full hover:bg-base-300 focus:outline-none"
                onClick={handleSearch}
              >
                <SearchIcon size={24} />
              </button>
              <button
                className="p-2 text-base-content rounded-full hover:bg-base-300 focus:outline-none"
                onClick={() => {
                  setSearch('');
                }}
              >
                <ResetIcon />
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
