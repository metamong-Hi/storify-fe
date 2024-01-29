import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@/components/icons/HeartIcon';

import { BooksData } from '@/types/books';

interface BookProps {
  book: BooksData;
  index: number;
}

const Book = ({ book, index }: BookProps) => {
  const [liked, setLiked] = React.useState(false);
  let imageURL;

  try {
    const body = book.body || null;
    const noBookImg = body ? body[1].imageUrl : '/images/pictures/noBookImg.png';
    imageURL = book.coverUrl || noBookImg;
  } catch (error) {
    imageURL = '/images/pictures/noBookImg.png';
  }

  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') ?? '';
  }

  const user = {
    avatar: '/images/pictures/noBookImg.png', // Replace with actual path to user's avatar
    bookshelfLink: `/user/${encodeURIComponent(book.userId?._id ?? '')}/bookshelf`, // Replace with actual link to user's bookshelf
    name: book.userId?.username ?? '', // Replace with actual user's name
  };

  return (
    <div
      key={index}
      className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl"
    >
      <figure className="w-full">
        <Link href={`/book/${encodeURIComponent(book?._id ?? '')}`}>
          <Image
            src={imageURL ?? ''}
            alt="Book Cover Image"
            layout="responsive"
            height={160} // Adjust the height to match your design
            width={280} // Adjust the width to match your design
            className="transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </figure>
      <div className="p-4">
        <div className="truncate w-full text-lg md:text-xl lg:text-2xl font-bold">{book.title}</div>
        <div className="flex justify-between items-center mt-2">
          <Link href={user.bookshelfLink}>
            <div className="flex items-center space-x-2">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full">
                  <Image src={user.avatar} alt={`${user.name}'s Avatar`} layout="fill" />
                </div>
              </div>
              <span className="text-sm font-semibold">{user.name}</span>
            </div>
          </Link>
          <button className="btn btn-ghost btn-circle" onClick={() => setLiked(!liked)}>
            <HeartIcon
              className={`w-6 h-6 ${liked ? 'fill-current text-red-500' : 'text-gray-500'}`}
            />
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm">{book.rate} views</span>
          <span className="text-sm">{book.count} likes</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
