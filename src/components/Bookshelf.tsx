'use client';

import Link from 'next/link';
import React, { useEffect, useState, useRef, useCallback, RefObject } from 'react';

import 'tailwindcss/tailwind.css';

// import "./Bookshelf.module.css";
// Assuming the imported image is processed and placed in the public folder

const Bookshelf: React.FC = () => {
    const bookshelfRef = useRef<HTMLUListElement>(null); // Update the type of bookshelfRef
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const shelfBackgroundImage = '/wood.jpg'; // Update with the path to your image

    const books = [
        'html',
        'java',
        'javascript',
        'typescript',
        'react',
        'next',
        'node',
        'express',
        'mysql',
        'mongodb',
        'python',
        'django',
        'flask',
        'c',
        'c++',
        'c#',
        'php',
        'ruby',
        'rails',
        'scala',
        'go',
        'rust',
        'swift',
        'kotlin',
        'android',
        'ios',
        'linux',
        'ubuntu',
        'centos',
        'debian',
        'redhat',
        'fedora',
        'windows',
        'macos',
        'unix',
        'nginx',
        'apache',
        'tomcat',
        'jenkins',
        'docker',
        'kubernetes',
        'aws',
        'azure',
        'gcp',
        'spring',
        'spring boot',
        'spring cloud',
        'spring data',
        'spring security',
        'spring batch',
        'spring integration',
        'spring jpa',
        'spring mvc',
        'spring webflux',
        'spring webmvc',
        'spring web',
        'spring rest',
        'spring soap',
        'spring graphql',
        'spring session',
        'spring websocket',
        'spring kafka',
        'spring rabbitmq',
        'spring redis',
        'spring cassandra',
        'spring mongodb',
        'spring cloud stream',
        'spring cloud task',
        'spring cloud data flow',
        'spring cloud config',
        'spring cloud consul',
        'spring cloud netflix',
        'spring cloud gateway',
        'spring cloud sleuth',
        'spring cloud openfeign',
        'spring cloud loadbalancer',
    ];

    // Mouse event handlers
    const mouseDownHandler = useCallback(
        (e: MouseEvent) => {
            setIsDown(true);
            bookshelfRef.current?.classList.add('active');
            setStartX(e.pageX - (bookshelfRef.current?.offsetLeft || 0));
            setScrollLeft(bookshelfRef.current?.scrollLeft || 0);
        },
        [bookshelfRef],
    );

    const mouseLeaveHandler = useCallback(() => {
        setIsDown(false);
        bookshelfRef.current?.classList.remove('active');
    }, [setIsDown, bookshelfRef]);

    const mouseUpHandler = useCallback(() => {
        setIsDown(false);
        bookshelfRef.current?.classList.remove('active');
    }, [setIsDown, bookshelfRef]);

    const mouseMoveHandler = useCallback(
        (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - (bookshelfRef.current?.offsetLeft || 0);
            const walk = (x - startX) * 3; // Adjust the multiplier as necessary
            bookshelfRef.current!.scrollLeft = scrollLeft - walk;
        },
        [isDown, startX, scrollLeft, bookshelfRef],
    );

    useEffect(() => {
        const bookshelf = bookshelfRef.current;
        bookshelf?.addEventListener('mousedown', mouseDownHandler);
        bookshelf?.addEventListener('mouseleave', mouseLeaveHandler);
        bookshelf?.addEventListener('mouseup', mouseUpHandler);
        bookshelf?.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            bookshelf?.removeEventListener('mousedown', mouseDownHandler);
            bookshelf?.removeEventListener('mouseleave', mouseLeaveHandler);
            bookshelf?.removeEventListener('mouseup', mouseUpHandler);
            bookshelf?.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, [mouseDownHandler, mouseLeaveHandler, mouseUpHandler, mouseMoveHandler]);

    return (
        <div className="flex overflow-hidden py-8 w-full h-full">
            <div
                ref={bookshelfRef as unknown as RefObject<HTMLDivElement>}
                className="flex overflow-x-scroll w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url("./wood-stripe.png")' }}
            >
                <div className="flex space-x-8">
                    {Array.from({ length: Math.ceil(books.length / 6) }, (_, bookshelfIndex) => (
                        <div
                            key={bookshelfIndex}
                            className="flex-none bg-cover bg-center"
                            style={{
                                width: '30vw',
                                height: '60vh',
                                marginRight: '5vw',
                                // Use responsive classes from Tailwind to adjust for different screen sizes
                            }}
                        >
                            {Array.from({ length: 3 }, (_, shelfIndex) => (
                                <ul
                                    key={shelfIndex}
                                    className="flex justify-start"
                                    style={{
                                        marginTop: '1vw',
                                        marginLeft: '5vw',
                                    }} // Adjust margins responsively if needed
                                >
                                    {books
                                        .slice(
                                            shelfIndex * 2 + bookshelfIndex * 6,
                                            (shelfIndex + 1) * 2 + bookshelfIndex * 6,
                                        )
                                        .map((book) => (
                                            <li key={book} className="group">
                                                <Link href={`/book/${encodeURIComponent(book)}`}>
                                                    <div className="relative w-36 h-48 shadow-lg rounded flex justify-center items-center text-xs font-medium text-gray-700 bg-white m-2">
                                                        <p className="flex justify-center items-center text-center">
                                                            {book}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="absolute left-0 w-full h-5 "
                                                        style={{
                                                            backgroundImage: 'url("./wood.jpg")',
                                                        }}
                                                    ></div>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bookshelf;
