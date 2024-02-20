'use client';

import useBooksData from '@/hooks/useBooksData';
import { BooksData } from '@/types/books';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Book } from './BookShelves';
import BookShelves from './BookShelves';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

interface UseBooksDataProps {
  userId: string;
}

const BooksList = ({ userId }: UseBooksDataProps) => {
  const { bookShelves } = useBooksData({
    currentPage: 1,
    limit: 10,
    sortBy: '',
    search: '',
    userId: userId,
    type: '',
  });

  return (
    <div className="p-5">
      <Swiper watchSlidesProgress={true} slidesPerView={5} className="mySwiper">
        {bookShelves.map((book, index) => (
          <SwiperSlide key={index}>
            <div className="">
              <div className="h-full">
                <Book book={book} index={index} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BooksList;
