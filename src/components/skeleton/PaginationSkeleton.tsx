import React from 'react';
import { Skeleton, Pagination } from '@nextui-org/react';

const PaginationSkeleton = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <Skeleton className="w-1/5 h-1/5 rounded-lg">
        <Pagination total={10} initialPage={1} />
      </Skeleton>
    </div>
  );
};

export default PaginationSkeleton;
