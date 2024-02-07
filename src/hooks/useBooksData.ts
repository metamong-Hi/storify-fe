// useBooksData.ts
import { useState, useEffect, useCallback } from 'react';
import { getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { GetParams } from '@/components/book/AllBooks';
interface UseBooksDataProps {
  currentPage: number;
  limit: number;
  sortBy: string;
  search: string;
  userId: string;
}
const useBooksData = ({ currentPage, limit, sortBy, search, userId }: UseBooksDataProps) => {
  const [bookShelves, setBookShelves] = useState<BooksData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllBooks(currentPage, limit, sortBy, search, userId);
        setBookShelves(data.books);
        setTotalItems(data.total);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, limit, sortBy, search, userId]);

  return { bookShelves, totalItems, isLoading };
};

export default useBooksData;
