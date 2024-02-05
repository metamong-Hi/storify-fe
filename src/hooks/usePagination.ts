import { useState, useMemo, useCallback } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const usePagination = ({ totalItems, itemsPerPage, onPageChange }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태를 추가합니다.

  const totalPage = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  // 페이지를 변경하는 함수
  const paginate = useCallback(
    (page: number) => {
      setCurrentPage(page); // 현재 페이지 상태를 업데이트합니다.
      onPageChange(page); // 부모 컴포넌트에 변경된 페이지를 알립니다.
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
