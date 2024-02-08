'use client';
import BookSkeleton from '@/components/skeleton/BookSkeleton';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';
import React, { useState } from 'react';
import Loading from '../allbooks/loading';

interface Props {
  cnt: number;
}

const TestBHPage: React.FC = () => {
  return (
    <>
      <Loading />
    </>
  );
};

export default TestBHPage;
