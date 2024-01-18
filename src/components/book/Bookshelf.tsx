'use client';

import Shelf from './Shelf';
import { use, useEffect, useState } from 'react';

export default function Library() {
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

    useEffect(() => {
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
        setBookShelves(divBooks());
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            {bookShelves.map((shelf, index) => (
                <Shelf key={index} books={shelf.books} /> // Pass the books prop correctly
            ))}
        </div>
    );
}
