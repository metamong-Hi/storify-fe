'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import Book from './Book';
import { getAllBooks } from './AllBooks';
import Pagination from './Pagination'; // Pagination 컴포넌트를 추가합니다.

export default function BookShelves() {
    const [bookShelves, setBookShelves] = useState<ReactElement[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

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
        <div
            className="bg-gray-100 p-2"
            style={{
                width: '100vw',
            }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {bookShelves.length > 0 ? bookShelves : <p>Loading...</p>}
            </div>
            <Pagination currentPage={currentPage} setPage={setCurrentPage} />
        </div>
    );
}
