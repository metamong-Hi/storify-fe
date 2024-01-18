'use client';

import Shelf from './Shelf';
import { use, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function BookShelves() {
    const allBooks: Array<{ title: string }> = [
        { title: 'html' },
        { title: 'java' },
        { title: 'javascript' },
        { title: 'typescript' },
        { title: 'react' },
        { title: 'next' },
        { title: 'node' },
        { title: 'express' },
        { title: 'mysql' },
        { title: 'mongodb' },
        { title: 'python' },
        { title: 'django' },
        { title: 'flask' },
        { title: 'c' },
        { title: 'c++' },
        { title: 'c#' },
        { title: 'php' },
        { title: 'ruby' },
        { title: 'rails' },
        { title: 'scala' },
        { title: 'go' },
        { title: 'rust' },
        { title: 'swift' },
        { title: 'kotlin' },
        { title: 'android' },
        { title: 'ios' },
        { title: 'linux' },
        { title: 'ubuntu' },
        { title: 'centos' },
        { title: 'debian' },
        { title: 'redhat' },
        { title: 'fedora' },
        { title: 'windows' },
        { title: 'macos' },
        { title: 'unix' },
        { title: 'nginx' },
        { title: 'apache' },
        { title: 'tomcat' },
        { title: 'jenkins' },
        { title: 'docker' },
        { title: 'kubernetes' },
        { title: 'aws' },
        { title: 'azure' },
        { title: 'gcp' },
        { title: 'spring' },
        { title: 'spring boot' },
        { title: 'spring cloud' },
        { title: 'spring data' },
        { title: 'spring security' },
        { title: 'spring batch' },
        { title: 'spring integration' },
        { title: 'spring jpa' },
        { title: 'spring cloud loadbalancer' },
    ];

    /*
    const allBooks: Array<{ title: string }> = awiat fetch('https://api.example.com/books').then((res) => res.json());
    */

    const [bookShelves, setBookShelves] = useState<{ books: { title: string }[] }[]>([]);

    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const divBooks = () => {
        const bookshelves: { books: { title: string }[] }[] = [];

        for (let i = 0; i < allBooks.length; i += 6) {
            const shelfBooks = allBooks.slice(i, i + 6);
            // 만약 6권보다 적은 책만 남았다면, 나머지 자리는 빈 책 객체로 채웁니다.
            while (shelfBooks.length < 6) {
                shelfBooks.push({ title: '' } as { title: string }); // 빈 책 객체를 추가합니다.
            }
            bookshelves.push({ books: shelfBooks });
        }
        return bookshelves;
    };
    useEffect(() => {
        setBookShelves(divBooks());
    }, []);
    const [currentShelfIndex, setCurrentShelfIndex] = useState(0);
    // 책장 데이터가 비어있지 않은지 확인합니다.
    if (bookShelves.length === 0) {
        return <div>책장 데이터를 불러오는 중...</div>;
    }

    // 인덱스가 배열 범위 내에 있는지 확인합니다.
    const currentShelf = bookShelves[currentShelfIndex];
    if (!currentShelf) {
        console.error('현재 책장 인덱스가 범위를 벗어났습니다:', currentShelfIndex);
        return <div>오류: 책장 데이터가 없습니다.</div>;
    }

    const nextShelf = () => {
        setCurrentShelfIndex((prevIndex) => (prevIndex + 1) % bookShelves.length);
    };

    const prevShelf = () => {
        setCurrentShelfIndex(
            (prevIndex) => (prevIndex - 1 + bookShelves.length) % bookShelves.length,
        );
    };

    const books = currentShelf.books; // 현재 책장의 책 데이터를 가져옵니다.

    const Books = bookShelves[currentShelfIndex]?.books || [];
    return (
        // <div
        //   className="flex overflow-hidden py-8"
        //   style={{ width: "100%", height: "100%" }}
        // >
        //   <div
        //     // ref={bookshelfRef as unknown as RefObject<HTMLDivElement>}
        //     className="flex overflow-x-scroll"
        //     style={{ height: "100%" }}
        //   >
        //     {bookShelves.map((shelf, index) => (
        //       <Shelf key={index} books={shelf.books} /> // Pass the books prop correctly
        //     ))}
        //   </div>
        // </div>

        // <Swiper
        //   spaceBetween={1}
        //   slidesPerView={4} // Adjust based on how many shelves you want to show at once
        //   navigation // Adds navigation arrows
        // >
        //   {bookShelves.map((shelf, index) => (
        //     <SwiperSlide key={index}>
        //       <Shelf key={index} books={shelf.books} />
        //     </SwiperSlide>
        //   ))}
        // </Swiper>
        <div className="bookshelf-slider">
            <button onClick={prevShelf}>&lt;</button>
            <Shelf key={currentShelfIndex} books={books as { title: string }[]} />
            <button onClick={nextShelf}>&gt;</button>
        </div>
    );
}
