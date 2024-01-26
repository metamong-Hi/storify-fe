import React from 'react';
import Link from 'next/link';
import { BooksData } from '@/types/books';
import { Card, CardFooter, CardBody, CardHeader, Image, Button } from '@nextui-org/react';
import { HeartIcon } from '@/components/icons/HeartIcon';

interface BookProps {
  Book: BooksData;
  index: number;
}

const Book = ({ Book, index }: BookProps) => {
  const [liked, setLiked] = React.useState(false);
  const body = Book.body ? Book.body : null;
  const noBookImg = body ? body[1].imageUrl : '/images/pictures/noBookImg.png';
  const imageURL = Book.coverUrl ? Book.coverUrl : noBookImg;

  return (
    <Card isFooterBlurred key={index} radius="lg" className="border-none relative">
      <Link href={`/book/${encodeURIComponent(Book._id)}`}>
        <Image
          isZoomed
          src={imageURL}
          alt="Book Cover Image"
          className="object-cover"
          height={1000}
          width={1000}
          loading="lazy"
        />
      </Link>

      <CardHeader className="p-0">
        <Button
          isIconOnly
          className="absolute z-10 top-2 right-2 text-default-900/60 bg-white/60 border-black border-1 hover:bg-white"
          onPress={() => setLiked((v) => !v)}
        >
          <HeartIcon
            className={liked ? '[&>path]:stroke-transparent' : ''}
            fill={liked ? '#fc3c3c' : 'none'}
          />
        </Button>
      </CardHeader>

      <CardFooter className="justify-between bg-white/50 border-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] h-[calc(20%_-_8px)] shadow-small ml-1 z-10">
        <div className="flex justify-between items-center">
          <div className="text-black-600 text-sm md:text-lg lg:text-xl">{Book.title}</div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <div className="text-black-600 text-sm md:text-lg lg:text-xl">{Book.count} views</div>
          <div className="text-black-600 text-sm md:text-lg lg:text-xl">{Book.rate} likes</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Book;
