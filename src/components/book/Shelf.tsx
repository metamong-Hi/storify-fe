'use client';

import Link from 'next/link';
import React, { useEffect, useState, useRef, useCallback, RefObject } from 'react';

import 'tailwindcss/tailwind.css';

// import "./Bookshelf.module.css";
// Assuming the imported image is processed and placed in the public folder

import Image from 'next/image';

interface BookshelfProps {
    books: { title: string }[];
}

const Shelf: React.FC<BookshelfProps> = ({ books }) => {
    return (
        <div className="relative">
            <Image
                src="/textures/bookshelf/bookShelf.png" // Correct the path
                alt="Bookshelf"
                width={500} // Example width
                height={500} // Example height
                className="w-full h-full" // Adjust these classes as needed
                layout="responsive" // Optional: This will maintain aspect ratio
            />
            <div className="absolute top-0 left-0">
                {books.map((book, index) => (
                    <div
                        key={index}
                        className="w-24 h-32 shadow-lg rounded flex justify-center items-center text-xs font-medium text-gray-700 bg-white"
                    >
                        <Link href={`/book/${encodeURIComponent(book.title)}`}>
                            <div onClick={() => console.log(`Book ${book.title} clicked`)}>
                                {book.title}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shelf;
