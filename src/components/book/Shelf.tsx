import React, { useEffect, useState, useRef, useCallback, RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import 'tailwindcss/tailwind.css';

interface BookshelfProps {
    key: number;
    books: { title: string }[];
}

const Shelf: React.FC<BookshelfProps> = ({ key, books = [] }) => {
    const rows = [books.slice(0, 3), books.slice(3, 6)];
    return (
        <div
            key={key}
            className="flex justify-start"
            style={{
                backgroundImage: 'url(/textures/bookshelf/bookShelf.png)',
                width: 'full',
                height: 'full',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="book-row">
                    {row.map((book, bookIndex) => (
                        <Link key={bookIndex} href={`/book/${encodeURIComponent(book.title)}`}>
                            <div className="relative w-12 h-16 shadow-lg rounded flex justify-center items-center text-xs font-medium text-gray-700 bg-white m-2">
                                <p className="flex justify-center items-center text-center">
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
