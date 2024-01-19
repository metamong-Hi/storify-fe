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
                    {allbooks.map((shelf, index) => (
                        <SwiperSlide key={index}>
                            <Shelf key={index} books={shelf} />
                        </SwiperSlide>
                    ))}
                </>
            );
        };

        setBookShelves(() => [bookShelves()]);
    }
    useEffect(() => {
        settingBookShelves();
    }, []);

    return (
        <div className="flex justify-center items-center ">
            <Swiper
                spaceBetween={0}
                slidesPerView={2}
                centeredSlides={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
            >
                {bookShelves ? bookShelves : <></>}
            </Swiper>
        </div>
    );
}
