// BookShelves.tsx
'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import Shelf from './Shelf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper styles
import { getAllBooks } from './AllBooks';
import Link from 'next/link';
import MakeBookButton from './MakeBookButton';

export default function BookShelves() {
    const [bookShelves, setBookShelves] = useState<ReactElement[]>([]);
    async function settingBookShelves() {
        const allbooks = await getAllBooks();
        console.log(allbooks);
        const bookShelves = () => {
            return (
                <>
                    {allbooks.map((shelf, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                width: '100vw',
                                height: '50vh',
                                backgroundColor: '#F7F7F7',
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            {shelf.title === 'makeBookButton' ? (
                                <Link
                                    href={'/writing'}
                                    className="flex justify-center items-center"
                                >
                                    <MakeBookButton />
                                </Link>
                            ) : (
                                <Link
                                    href={`/book/${encodeURIComponent(shelf._id)}`}
                                    className="flex justify-center items-center"
                                >
                                    <div
                                        className="relative shadow-lg rounded flex justify-center items-center text-xs font-medium text-gray-700 bg-white ml-5 mb-10"
                                        style={{
                                            width: '7vw',
                                            height: '14vh',
                                        }}
                                    >
                                        <p className="flex text-center justify-center items-center ">
                                            {shelf.title}
                                        </p>
                                    </div>
                                </Link>
                            )}
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
        <div
            className="flex justify-center items-center "
            style={{
                backgroundColor: '#F7F7F7',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <Swiper
                spaceBetween={0}
                slidesPerView={11}
                centeredSlides={true}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {bookShelves ? bookShelves : <></>}
            </Swiper>
        </div>
    );
}
