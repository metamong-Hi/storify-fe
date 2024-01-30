'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import BookShelves from '@/components/book/BookShelves';
import { getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { Pagination, Input, Tabs, Tab } from '@nextui-org/react';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';

import { SearchIcon } from '@/components/icons/SearchIcon';

const BooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookShelves, setBookShelves] = useState<BooksData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [limit, setLimit] = useState<number>(24);
  const [writeSearch, setWriteSearch] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const sortOptions = [
    { label: '최신순', value: 'date' },
    { label: '인기순', value: 'likes' },
    { label: '제목순', value: 'title' },
  ];
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);
  const fetchData = useCallback(
    async (currentPage: number, limit: number, sortBy: string, search: string) => {
      getAllBooks(currentPage, limit, sortBy, search)
        .then((data) => {
          console.log(data);
          setBookShelves(data.books);
          setTotalItems(data.total);
        })
        .catch((error) => {
          console.error('Failed to fetch books:', error);
        });
    },
    [],
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWriteSearch(e.target.value);
  };

  const handleSearch = () => {
    setSearch(writeSearch);
  };

  useEffect(() => {
    fetchData(currentPage, limit, sortBy, search);
  }, [currentPage, limit, sortBy, search, fetchData]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / limit);
  }, [totalItems, limit]);

  return (
    <div className="container flex justify-center items-center p-5">
      <div className="flex flex-col w-[100vw] ">
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
              <button className="p-2 focus:outline-none bg-transparent" onClick={handleSearch}>
                <SearchIcon size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <BookShelves books={bookShelves} limit={limit} search={search} />
        {totalPages ? (
          <span className="flex justify-center items-center">
            <Pagination
              classNames={{
                item: 'w-8 h-8 text-small rounded-none bg-transparent',
                cursor:
                  'bg-gradient-to-b shadow-lg from-default to-default-800 dark:from-default dark:to-default-100 text-white font-bold',
              }}
              key={'flat'}
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={(page: number) => {
                setCurrentPage(page);
              }}
            />
          </span>
        ) : search ? null : (
          <PaginationSkeleton />
        )}
      </div>
    </div>
  );
};

export default BooksPage;
