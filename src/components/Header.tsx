'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { logout } from '@/store/userSlice';
import { store } from '@/store/index';

import { Tabs, Tab } from '@nextui-org/react';

interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const dispatch = useAppDispatch();
    // const username = useAppSelector(state => state.user.username);
    const realToken = useAppSelector((state) => state.user.token);
    console.log(realToken);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // const token = localStorage.getItem('token');
            const token=sessionStorage.getItem('token');
            setUsername(sessionStorage.getItem('username') || '');
            // setUsername(hihi);
            setIsLoggedIn(!!token);
        }
    }, []);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleClickBook = () => {
        // router.push('/book');
    };
    const handleClickHome = () => {
        // router.push('/');
    };
    const handleClickLogout = () => {
        dispatch(logout())
            .then(() => {
                // localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                setIsLoggedIn(false);
                console.log('로그아웃 성공함');
            })
            .catch((error) => {
                console.log('로그아웃 망함' + error);
            });
    };

    return (
        <header className="shadow-md font-sans">
            <div className="flex flex-wrap items-center justify-between gap-4 z-1000 mx-0 relative bg-white min-h-[70px] lg:flex-grow">
                <div className="flex items-center mx-8">
                    <Link
                        href="/"
                        className="text-4xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            STORIFY
                        </span>
                    </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Tabs
                        key={'underlined'}
                        variant={'underlined'}
                        color={'default'}
                        aria-label="Tabs variants"
                        radius="full"
                    >
                        <Tab href="/home" key="home" title="홈" />
                        <Tab target="/allbooks" key="shelves" title="책장" />
                        <Tab key="music" title="Music" />
                        <Tab key="videos" title="Videos" />
                    </Tabs>
                </div>

                {/* 오른쪽 정렬*/}
                <div className="flex justify-end">
                    <div className="lg:hidden">
                        <button id="toggle" onClick={toggleMenu} className="justify-end">
                            <svg
                                className="w-7 h-7"
                                fill="#000"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <ul
                        id="collapseMenu"
                        className={`absolute lg:relative lg:flex lg:space-x-4 ${isMenuOpen ? 'right-0' : '-right-full'} lg:right-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all duration-300 ease-in-out lg:block py-4 lg:py-0 h-screen lg:h-auto`}
                    >
                        {/* <h5 className="hidden md:block ">{name}님 환영합니다</h5> */}
                        <button
                            className="absolute top-0 right-0 mt-4 mr-4 lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            X
                        </button>
                        {isLoggedIn ? (
                            <>
                                {!isMenuOpen && (
                                    <h5 className="hidden sm:block md:block">
                                        {username}님 환영합니다
                                    </h5>
                                )}
                                <li
                                    className={`py-2 px-3 lg:py-0 lg:px-4 ${isMenuOpen ? 'mt-8' : ''}`}
                                >
                                    {' '}
                                    <a
                                        className="text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block"
                                        onClick={() => handleClickLogout()}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li
                                    className={`border-b lg:border-none py-2 px-3 lg:py-0 lg:px-4' ${isMenuOpen ? 'mt-8' : ''}`}
                                >
                                    <Link
                                        href="/login"
                                        className="text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li
                                    className={`border-b lg:border-none py-2 px-3 lg:py-0 lg:px-4' ${isMenuOpen ? 'mt-4' : ''}`}
                                >
                                    <Link
                                        href="/signup"
                                        className="text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};
export default Header;
