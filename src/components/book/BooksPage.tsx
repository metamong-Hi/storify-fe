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
        <div className="flex flex-hor justify-between">
          <div role="tablist" className="tabs tabs-bordered flex justify-start itmes-center pl-5">
            {sortOptions.map((option) => (
              <a
                key={option.value}
                role="tab"
                className={`tab tab-lifted ${sortBy === option.value ? 'tab-active' : ''}`}
                onClick={() => handleSortBy(option.value)}
              >
                {option.label}
              </a>
            ))}
          </div>

          <div className="flex justify-end items-center pr-5">
            <div className="flex items-center border-2 border-gray-300 rounded-full pl-3 pr-2 bg-transparent">
              <input
                className="w-full bg-transparent py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none"
                id="search"
                type="search"
                placeholder="검색어를 입력하세요."
                value={writeSearch}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                onChange={handleInputChange}
              />
              <button
                className="btn btn-ghost btn-circle btn-sm hover:bg-black/5 dark:hover:text-white"
                type="button"
                onClick={handleSearch}
              >
                <SearchIcon size={18} className="text-gray-500 transition-colors duration-200 " />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            <BookShelves books={bookShelves} limit={limit} search={search} />
          </div>
        </div>
        <Pagination totalPage={totalPage} currentPage={currentPage} paginate={paginate} />
      </div>
    </>
  );
};

export default BooksPage;
