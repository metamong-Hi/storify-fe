import React from 'react';

import { Card, CardFooter, Image, Skeleton } from '@nextui-org/react';
interface Props {
  cnt: number;
}
const BookSkeleton = ({ cnt }: Props) => {
  return new Array(cnt).fill('').map((_, i) => (
    <Card isFooterBlurred radius="lg" className="border-none" key={i}>
      <Skeleton className="rounded-lg">
        <Image alt="Book Cover Image" className="object-cover" height={1000} width={1000} />
      </Skeleton>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="flex justify-between items-center">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="text-gray-600 text-sm"></div>
          </Skeleton>
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="text-gray-600 text-sm"></div>
          </Skeleton>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="text-gray-600 text-sm"></div>
          </Skeleton>
        </div>
      </CardFooter>
    </Card>
  ));
};

export default BookSkeleton;
