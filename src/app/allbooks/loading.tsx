import BookSkeleton from '@/components/skeleton/BookSkeleton';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';
import React from 'react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <BookSkeleton cnt={24} />
      <PaginationSkeleton />
    </>
  );
}
