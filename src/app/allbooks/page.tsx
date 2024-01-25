'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import BookShelves from '@/components/book/BookShelves';
import { getAllBooks } from '@/components/book/AllBooks';
import { BooksData } from '@/types/books';
import { Pagination } from '@nextui-org/react';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [bookShelves, setBookShelves] = useState<BooksData[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);

    const limit = 24;

    useEffect(() => {
        getAllBooks(currentPage, limit)
            .then((data) => {
                setBookShelves(data.books);
            })
            .catch((error) => {
                console.error('Failed to fetch books:', error);
            });
    }, [currentPage, limit]);

    useEffect(() => {
        getAllBooks(1, limit)
            .then((data) => {
                setTotalItems(data.total);
            })
            .catch((error) => {
                console.error('Failed to fetch total number of books:', error);
            });
    }, [limit]);

    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / limit);
    }, [totalItems, limit]);

    return (
        <div className="container flex justify-center items-center ">
            <div className="flex flex-col ">
                <BookShelves books={bookShelves} limit={limit} />
                {totalPages ? (
                    <Pagination
                        className="flex justify-center items-center p-10"
                        key={'light'}
                        total={totalPages}
                        initialPage={1}
                        value={currentPage}
                        onChange={(page: number) => {
                            setCurrentPage(page);
                        }}
                    />
                ) : (
                    <PaginationSkeleton />
                )}
            </div>
        </div>
    );
};

export default Page;
