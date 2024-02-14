'use client';

import { getAllBooks } from '@/components/book/AllBooks';
import BooksPage from '@/components/book/BooksPage';
import { BooksData } from '@/types/books';
import { Suspense } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Loading from './loading';
import Layout from './layout';

const Page = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <BooksPage userId="" />
    </div>
  );
};

export default Page;
