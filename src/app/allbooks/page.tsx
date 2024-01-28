'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import BookShelves from '@/components/book/BookShelves';
import { getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { Pagination } from '@nextui-org/react';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookShelves, setBookShelves] = useState<BooksData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  const limit = 24;

  useEffect(() => {
    getAllBooks(currentPage, limit)
      .then((data) => {
        setBookShelves(data.books);
        setTotalItems(data.total);
      })
      .catch((error) => {
        console.error('Failed to fetch books:', error);
      });
  }, [currentPage, limit]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / limit);
  }, [totalItems, limit]);

  return (
    <div className="container flex justify-center items-center ">
      <div className="flex flex-col ">
        <BookShelves books={bookShelves} limit={limit} />
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
        ) : (
          <PaginationSkeleton />
        )}
      </div>
    </div>
  );
};

export default Page;
