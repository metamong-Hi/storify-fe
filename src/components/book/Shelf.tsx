import React from 'react';
import Link from 'next/link';
import { BooksData } from '@/types/books';
import MakeBookButton from './MakeBookButton';
import Image from 'next/image'; // Import the Image component

interface ShelfProps {
    shelf: BooksData;
    index: number;
}

const Shelf = ({ shelf, index }: ShelfProps) => {
    console.log(shelf);
    return (
        <div key={index} className="bg-gray-100 p-8">
            <Link href={`/book/${encodeURIComponent(shelf._id)}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example of a single card */}
                    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <Image
                            className="w-full"
                            src={`${shelf.coverUrl}`}
                            alt="Story Image"
                            width={1000}
                            height={1000}
                        />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{shelf.title}</div>
                            {/* Other content */}
                        </div>
                    </div>
                    {/* Repeat the card component for other items */}
                </div>
            </Link>
        </div>
    );
};

export default Shelf;
