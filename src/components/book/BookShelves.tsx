// BookShelves.tsx
'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import Shelf from './Shelf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper styles
import { getAllBooks } from './AllBooks';

export default function BookShelves() {
    const [bookShelves, setBookShelves] = useState<ReactElement[]>([]);
    async function settingBookShelves() {
        const allbooks = await getAllBooks();
        console.log(allbooks);
        const bookShelves = () => {
            return (
                <>
                    {' '}
                    {allbooks.map((shelf, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="flex justify-center items-center bg-no-repeat bg-center bg-cove"
                                style={{
                                    backgroundImage: 'url(/textures/bookshelf/bookShelf.png)',
                                    height: '100vh',
                                }}
                            >
                                <Shelf key={index} books={shelf} />
                            </div>
                        </SwiperSlide>
                    ))}
                </>
            );
        };

        setBookShelves(() => [bookShelves()]);
    }
    useEffect(() => {
        settingBookShelves();
        console.log('BookShelves.tsx');
    }, []);

    return (
        <div
            className="flex justify-center items-center"
            style={{
                width: '80vw',
                height: '80vh',
            }}
        >
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {bookShelves}
            </Swiper>
        </div>
    );
}
