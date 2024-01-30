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
            <input
              className="input input-bordered max-w-full sm:max-w-[15rem] h-10 text-small font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
              value={writeSearch}
              onChange={handleInputChange}
              placeholder="책 제목을 검색해보세요"
              type="search"
            />
            <button onClick={handleSearch}>
              <SearchIcon size={18} />
            </button>
          </div>
        </div>

        <BookShelves currentPage={currentPage} limit={limit} search={search} sortBy={sortBy} />
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
