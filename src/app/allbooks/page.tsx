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

    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    const handleResize = useCallback(() => {
        if (typeof window === 'undefined') return;
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const limit = useMemo(() => {
        if (windowWidth >= 1920 || windowHeight >= 1920) return 36;
        else if (windowWidth >= 1600 || windowHeight >= 1600) return 24;
        else if (windowWidth >= 1200 || windowHeight >= 1200) return 12;
        else return 12;
    }, [windowWidth, windowHeight]);

    useEffect(() => {
        fetchBooks(currentPage, limit);
    }, [currentPage, limit]);

    const fetchBooks = async (page: number, limit: number) => {
        getAllBooks(page, limit)
            .then((data) => {
                setBookShelves(data.books);
            })
            .catch((error) => {
                console.error('Failed to fetch books:', error);
            });
    };

    useEffect(() => {
        getAllBooks(1, limit)
            .then((data) => {
                setTotalItems(data.total);
            })
            .catch((error) => {
                console.error('Failed to fetch total number of books:', error);
            });
    }, [limit]);

    useEffect(() => {
        fetchBooks(currentPage, limit);
    }, [currentPage, limit]);

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
