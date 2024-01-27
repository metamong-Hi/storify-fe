'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import BookShelves from '@/components/book/BookShelves';
import { getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { Pagination, PaginationItemType, PaginationItemRenderProps } from '@nextui-org/react';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';
import { ChevronIcon } from '@/components/icons/ChevronIcon';
import cn from 'classnames';

const renderItem = ({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
}: PaginationItemRenderProps<HTMLButtonElement>) => {
  if (value === PaginationItemType.NEXT) {
    return (
      <button
        key={key}
        className={cn(className, 'bg-[#B68973]/50 min-w-8 w-8 h-8')}
        onClick={onNext}
      >
        <ChevronIcon className="rotate-180" />
      </button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button
        key={key}
        className={cn(className, 'bg-[#B68973]/50 min-w-8 w-8 h-8')}
        onClick={onPrevious}
      >
        <ChevronIcon />
      </button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} className={className}>
        ...
      </button>
    );
  }

  // cursor is the default item
  return (
    <button
      ref={ref}
      key={key}
      className={cn(className, isActive && 'text-white bg-[#B68973] font-bold')}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  );
};

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
          <Pagination
            disableCursorAnimation
            showControls
            total={totalPages}
            page={currentPage}
            initialPage={1}
            className="gap-2 flex justify-center items-center"
            radius="full"
            renderItem={renderItem}
            variant="light"
            onChange={(page: number) => {
              setCurrentPage(page);
            }}
          />
        ) : (
          <PaginationSkeleton />
        )}
      </div>
    </div>
  );
};

export default Page;
