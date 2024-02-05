'use client';

import { getAllBooks } from '@/components/book/AllBooks';
import BooksPage from '@/components/book/BooksPage';
import { BooksData } from '@/types/books';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

const Page = () => {
  return (
    <div className="container flex justify-center items-center p-5">
      <BooksPage getBooks={getAllBooks} userId="" />
    </div>
  );
};

export default Page;
