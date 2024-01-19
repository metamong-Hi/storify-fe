// BookShelves.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Shelf from './Shelf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper styles
import { allBooks } from './AllBooks';
import styled from 'styled-components';
const StyledBookcase = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
export default function BookShelves() {
    const [bookShelves, setBookShelves] = useState<Array<{ books: { title: string }[] }>>([]);

    useEffect(() => {
        const newBookShelves = [];
        for (let i = 0; i < allBooks.length; i += 6) {
            const shelfBooks = allBooks.slice(i, i + 6);
            while (shelfBooks.length < 6) {
                shelfBooks.push({ title: '' } as { title: string });
            }
            newBookShelves.push({
                books: shelfBooks,
            });
        }
        setBookShelves(newBookShelves);
    }, []);

    return (
        <div
            className="flex   "
            style={{
                width: '70vw',
                height: '80vh',
            }}
        >
            <Swiper
                spaceBetween={0}
                slidesPerView={2}
                centeredSlides={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {bookShelves.map((shelf, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="flex justify-center items-center bg-no-repeat bg-center bg-cove"
                            style={{
                                backgroundImage: 'url(/textures/bookshelf/bookShelf.png)',
                                height: '100vh',
                            }}
                        >
                            <Shelf key={index} books={shelf.books} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
