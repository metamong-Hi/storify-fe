'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import BookShelves from '@/components/book/BookShelves';
import { getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { Pagination, Input, Tabs, Tab } from '@nextui-org/react';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';

import debounce from 'lodash/debounce';

import { SearchIcon } from '@/components/icons/SearchIcon';

const BooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookShelves, setBookShelves] = useState<BooksData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [limit, setLimit] = useState<number>(24);

  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const sortOptions = [
    { label: '최신순', value: 'date' },
    { label: '인기순', value: 'likes' },
    { label: '제목순', value: 'title' },
  ];
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);

  const handler = debounce((nextValue) => setDebouncedSearch(nextValue), 300);

  useEffect(() => {
    // Call the debounced search handler whenever search changes
    handler(search);

    // Cleanup function to cancel the debounce if the component is unmounted or the value changes
    return () => {
      handler.cancel();
    };
  }, [search, handler]); // Inc
  useEffect(() => {
    getAllBooks(currentPage, limit, sortBy, debouncedSearch)
      .then((data) => {
        setBookShelves(data.books);
        setTotalItems(data.total);
      })
      .catch((error) => {
        console.error('Failed to fetch books:', error);
      });
  }, [currentPage, limit, sortBy, debouncedSearch]);

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
          <p className="flex justify-end items-center pr-5">
            <Input
              classNames={{
                base: 'max-w-full sm:max-w-[15rem] h-10',
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper:
                  'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              }}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="책 제목을 검색해보세요"
              size="sm"
              endContent={<SearchIcon size={18} />}
              type="search"
            />
          </p>
        </div>

        <BookShelves books={bookShelves} limit={limit} search={search} />
        {totalPages ? (
          <span className="flex justify-center items-center">
            <Pagination
              classNames={{
                item: 'w-8 h-8 text-small rounded-none bg-transparent',
                cursor:
                  'bg-gradient-to-b shadow-lg from-[#B68973] to-default-800 dark:from-[#B68973] dark:to-default-100 text-white font-bold',
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
