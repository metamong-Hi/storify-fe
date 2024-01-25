import React from 'react';
import Link from 'next/link';
import { BooksData } from '@/types/books';
import { Card, CardFooter, Image, Button } from '@nextui-org/react';

interface BookProps {
    Book: BooksData;
    index: number;
}

const Book = ({ Book, index }: BookProps) => {
    const imageURL = Book.coverUrl ? Book.coverUrl : '/images/pictures/noBookImg.png';
    return (
        <Link href={`/book/${encodeURIComponent(Book._id)}`}>
            <Card isFooterBlurred radius="lg" className="border-none">
                <Image
                    src={imageURL}
                    alt="Book Cover Image"
                    className="object-cover"
                    height={1000}
                    width={1000}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <div className="flex justify-between items-center">
                        <div className="text-gray-600 text-sm">{Book.title}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-gray-600 text-sm">{Book.count} views</div>
                        <div className="text-gray-600 text-sm">{Book.rate} likes</div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default Book;
