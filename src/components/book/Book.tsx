import React from 'react';
import Link from 'next/link';
import { BooksData } from '@/types/books';
import Image from 'next/image';
import styled from 'styled-components';

interface BookProps {
    Book: BooksData;
    index: number;
}

// Adjust these values to match your actual book cover aspect ratio and size
const BookShadow = styled.div`
    width: 400px; // Width of the book cover
    height: 480px; // Height of the book cover, typically 1.5 times the width for a book
    position: relative;
    box-shadow:
        5px 5px 10px rgba(0, 0, 0, 0.2),
        -5px 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 10px; // Simulate the spine of the book by offsetting slightly from the left edge
        height: 100%;
        width: 20px; // The thickness of the book's spine
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0) 50%);
    }
`;

const Book = ({ Book, index }: BookProps) => {
    const imageURL = Book.coverUrl ? Book.coverUrl : '/images/pictures/noBookImg.png';
    return (
        <div
            key={index}
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out m-2"
        >
            <Link href={`/book/${encodeURIComponent(Book._id)}`}>
                <div className="block">
                    <BookShadow>
                        <Image
                            src={imageURL}
                            alt="Book Cover Image"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                        />
                    </BookShadow>
                    <div className="text-center mt-4">
                        <div className="text-lg font-bold">{Book.title}</div>
                        <div className="text-gray-800 text-sm">{Book.userId.username}</div>
                        <div className="text-gray-600 text-sm">{Book.count} views</div>
                        <div className="text-gray-600 text-sm">{Book.rate} likes</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Book;
