import { useState, useEffect, useCallback } from 'react';
import { getBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';

interface UseBooksDataProps {
  type: string;
  currentPage: number;
  limit: number;
  sortBy: string;
  search: string;
  userId: string;
}
const useBooksData = ({
  currentPage = 1,
  limit = 24,
  sortBy = '',
  search = '',
  userId = '',
  type = '',
}: UseBooksDataProps) => {
  const [bookShelves, setBookShelves] = useState<BooksData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getBooks(currentPage, limit, sortBy, search, userId, type);
        if (type === 'liked') {
          console.log('data:', data);
          setBookShelves(data);
          setTotalItems(data.length);
        } else {
          setBookShelves(data.books);
          setTotalItems(data.total);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, limit, sortBy, search, userId, type]);

  return { bookShelves, totalItems, isLoading };
};

export default useBooksData;
