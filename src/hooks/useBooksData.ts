// useBooksData.ts
import { useState, useEffect, useCallback } from 'react';
import { getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';

const useBooksData = (currentPage: number, limit: number, sortBy: string, search: string) => {
  const [bookShelves, setBookShelves] = useState<BooksData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllBooks(currentPage, limit, sortBy, search);
      setBookShelves(data.books);
      setTotalItems(data.total);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit, sortBy, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { bookShelves, totalItems, isLoading };
};

export default useBooksData;
