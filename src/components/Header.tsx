'use client';
// components/Header.tsx
import React, { useState, useEffect } from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleClickBook = () => {
        // router.push('/book');
    };
    const handleClickHome = () => {
        // router.push('/');
    };
    const name = '민상기';
    return (
        <header className="shadow-md font-sans">
            <div className="flex flex-wrap items-center justify-between gap-4  mx-0 relative bg-white min-h-[70px] lg:flex-grow" style={{ zIndex: 1000 }}>
                {/*왼쪽 정렬*/}
                <div className="flex items-center mx-8">
                <a href="javascript:void(0)" onClick={handleClickHome}>
                        <img
                            src="/images/angels/logo.png"
                            alt="logo"
                            className="w-12 h-12"
                        />
                    </a>
                    <a href="javascript:void(0)" onClick={handleClickHome}>
                        <img
                            src="/images/Logos/storifyLogo.png"
                            alt="logo"
                            className="w-24 h-12"
                        />
                    </a>

                    {/*여기 수정해야함 -> 라우팅 방식 바뀜*/}
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
                                        {name}님 환영합니다
                                    </h5>
                                )}
                                <li
                                    className={`py-2 px-3 lg:py-0 lg:px-4 ${isMenuOpen ? 'mt-8' : ''}`}
                                >
                                    {' '}
                                    <a
                                        href="#"
                                        className="text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block"
                                        onClick={() => setIsLoggedIn(false)}
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
                                    <a
                                        href="#"
                                        className="text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block"
                                    >
                                        Login
                                    </a>
                                </li>
                                <li
                                    className={`border-b lg:border-none py-2 px-3 lg:py-0 lg:px-4' ${isMenuOpen ? 'mt-4' : ''}`}
                                >
                                    <a
                                        href="#"
                                        className="text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block"
                                    >
                                        Register
                                    </a>
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