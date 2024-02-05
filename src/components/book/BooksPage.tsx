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
  getBooks: (
    page: number,
    limit: number,
    sort: string,
    search: string,
    id: string,
  ) => Promise<{ books: BooksData[]; total: number }>;
  userId: string;
}

const BooksPage = ({ getBooks, userId }: UseBooksDataProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState<number>(24);
  const [writeSearch, setWriteSearch] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const { bookShelves, totalItems, isLoading } = useBooksData({
    getBooksFunction: getBooks,
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
  const sortOptions = [
    { label: '최신순', value: 'date' },
    { label: '인기순', value: 'likes' },
    { label: '제목순', value: 'title' },
  ];

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
          <Tabs key="sortByOptions" className="flex justify-start itmes-center pl-5">
            {sortOptions.map((option) => (
              <Tab key={option.value} value={option.value} title={option.label} />
            ))}
          </Tabs>
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

        <BookShelves books={bookShelves} limit={limit} search={search} />
        <Pagination totalPage={totalPage} currentPage={currentPage} paginate={paginate} />
      </div>
    </>
  );
};

export default BooksPage;
