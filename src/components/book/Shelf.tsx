import React, { useEffect, useState, useRef, useCallback, RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import 'tailwindcss/tailwind.css';
import { BooksData } from '@/types/books';

interface BookshelfProps {
    key: number;
    books: BooksData[];
}

const Shelf: React.FC<BookshelfProps> = ({ key, books = [] }) => {
    const rows = [books.slice(0, 2), books.slice(2, 4), books.slice(4, 6)];
    return (
        <div
            className="flex flex-col justify-center items-center bg-no-repeat bg-center"
            style={{
                backgroundImage: 'url(/textures/bookshelf/bookShelf.png)',
                backgroundSize: 'auto',
                height: '100vh',
                width: '100vw',
            }}
        >
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center items-center ">
                    {row.map((book, bookIndex) => (
                        <Link
                            key={bookIndex}
                            href={`/book/${encodeURIComponent(book._id)}`}
                            className="flex justify-center items-center"
                        >
                            <div
                                className="relative shadow-lg rounded flex justify-center items-center text-xs font-medium text-gray-700 bg-white ml-5 mb-10"
                                style={{
                                    width: '7vw',
                                    height: '14vh',
                                }}
                            >
                                <p className="flex text-center justify-center items-center ">
                                    {book.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Shelf;
