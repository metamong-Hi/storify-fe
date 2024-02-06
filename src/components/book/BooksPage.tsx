'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import BookShelves from '@/components/book/BookShelves';
import { GetParams, getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { Tabs, Tab } from '@nextui-org/react';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';

import Pagination from '@/components/Pagination';
import { SearchIcon } from '@/components/icons/SearchIcon';
import useBooksData from '@/hooks/useBooksData';
import usePagination from '@/hooks/usePagination';

interface UseBooksDataProps {
  userId: string;
}

const BooksPage = ({ userId }: UseBooksDataProps) => {
  const sortOptions = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'like' },
    { label: '조회순', value: 'count' },
  ];

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
    userId: userId, // Provide a value or initializer for the 'id' shorthand property
  });

  const { totalPage, paginate } = usePagination({
    totalItems,
    itemsPerPage: limit,
    // 현재 페이지 상태를 usePagination으로 넘겨줍니다.
    onPageChange: setCurrentPage, // 페이지 변경 시 호출할 함수를 넘겨줍니다.
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
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <div className="flex justify-start pl-5 space-x-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`px-4 py-2 text-sm font-medium leading-5 text-gray-700 rounded-lg focus:outline-none focus:shadow-outline ${
                  sortBy === option.value ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
                onClick={() => handleSortBy(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex items-center pr-5">
            <div className="flex border-2 border-gray-300 bg-white rounded-full pl-3 pr-2">
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

        <div className="flex justify-center p-5">
          <div className="flex flex-wrap justify-center gap-4">
            <BookShelves books={bookShelves} limit={limit} search={search} />
          </div>
        </div>

        <Pagination totalPage={totalPage} currentPage={currentPage} paginate={paginate} />
      </div>
    </>
  );
};

export default BooksPage;
