import { useState, useMemo, useCallback } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const usePagination = ({ totalItems, itemsPerPage, onPageChange }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  const paginate = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onPageChange(page);
    },
    [onPageChange],
  );

  return {
    currentPage,
    totalPage,
    paginate,
  };
};

export default usePagination;
