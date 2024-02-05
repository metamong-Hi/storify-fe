// useBooksData.ts
import { useState, useEffect, useCallback } from 'react';
import { getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { GetParams } from '@/components/book/AllBooks';
interface UseBooksDataProps {
  getBooksFunction: (
    page: number,
    limit: number,
    sort: string,
    search: string,
    id: string,
  ) => Promise<{ books: BooksData[]; total: number }>;
  currentPage: number;
  limit: number;
  sortBy: string;
  search: string;
  userId: string;
}
const useBooksData = ({
  getBooksFunction,
  currentPage,
  limit,
  sortBy,
  search,
  userId,
}: UseBooksDataProps) => {
  const [bookShelves, setBookShelves] = useState<BooksData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log('fetchData', currentPage, limit, sortBy, search, userId);
        const data = await getBooksFunction(currentPage, limit, sortBy, search, userId);
        setBookShelves(data.books);
        setTotalItems(data.total);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, limit, sortBy, search, userId, getBooksFunction]);

  return { bookShelves, totalItems, isLoading };
};

export default useBooksData;
