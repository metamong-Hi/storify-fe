'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import Book from './Book';

import { getAllBooks } from './AllBooks';
// import Pagination from './Pagination'; // Pagination 컴포넌트를 추가합니다.
import { Pagination, Spinner } from '@nextui-org/react';
import BookSkeleton from '../skeleton/BookSkeleton';

export default function BookShelves() {
    const [bookShelves, setBookShelves] = useState<ReactElement[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const variants = ['flat', 'bordered', 'faded', 'light'];

    async function settingBookShelves(page: number) {
        const allbooks = await getAllBooks(page);
        const bookShelves = allbooks.map((book, index) => (
            <Book key={index} Book={{ ...book }} index={index} />
        ));
        setBookShelves(bookShelves);
    }

    useEffect(() => {
        settingBookShelves(currentPage);
    }, [currentPage]);

    return (
        <div className="bg-gray-100 p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {bookShelves.length > 0 ? bookShelves : <BookSkeleton />}
            </div>
            <Pagination key={'light'} total={10} initialPage={1} variant={'light'} />
        </div>
    );
}
