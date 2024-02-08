'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { logout } from '@/store/userSlice';
import LoginPage from '@/components/login/realLogin';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { set } from 'lodash';
import SettingsComponent from './Setting/Settings';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const pathName = usePathname();

  const dispatch = useAppDispatch();
  const realToken = useAppSelector((state) => state.user.token);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      setNickname(sessionStorage.getItem('nickname') || '');
      if (token) {
        const id = jwtDecode(token);
        setUserId(id.sub || '');
      }

      setIsLoggedIn(!!token);
      console.log('isLoggedIn', isLoggedIn);
    }
  }, []);

  const handleClickLogout = () => {
    dispatch(logout())
      .then(() => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isActive = (pathname: string) => {
    return pathName === pathname;
  };

  const openLoginModal = () => {
    const modal = document.getElementById('authModal');
    if (modal) {
      const modalElement = document.getElementById('authModal') as HTMLDialogElement;
      modalElement.showModal();
    }
  };

  const menuItems = [
    {
      link: '/allbooks',
      text: '책장',
      onClick: () => {},
    },
    {
      link: isLoggedIn ? '/writing' : '#',
      text: '책 만들기',
      onClick: isLoggedIn ? () => {} : openLoginModal,
    },
  ];

  return (
    <>
      <div className="navbar bg-base-100 pl-[7vw] pr-[7vw]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[5] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item, index) => (
                <li key={index} className="text-xl xl:text-xl font-bold p-1">
                  <Link
                    href={item.link}
                    className={`block p-4 rounded-lg hover:bg-base-200 ${isActive(item.link) ? 'bg-base-200' : ''}`}
                  >
                    <div onClick={item.onClick}>{item.text}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="justify-start p-5">
            <Link
              href="/"
              className="text-base text-xl text-bold sm:text-2xl lg:text-3xl 2xl:text-4xl"
            >
              <span>STORIFY</span>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="text-xs sm:text-base md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-bold p-1"
              >
                <Link
                  href={item.link}
                  className={`block p-4 rounded-lg hover:bg-base-200 ${isActive(item.link) ? 'bg-base-200' : ''}`}
                >
                  <div onClick={item.onClick}>{item.text}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex navbar-end p-5 overflow-visible md:overflow-visible">
          {isLoggedIn ? (
            <>
              <span className="text-xs pr-2 sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                <span className="font-bold pr-2">{nickname}</span>님 환영합니다
              </span>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 h-8 rounded-full">
                    <Image
                      alt="User avatar"
                      src="https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content z-[5] mt-3 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link
                      href={`/user/${userId}/bookshelf`}
                      className="p-4 text-xs sm:text-xs md:text-lg lg:text-xl xl:text-lg 2xl:text-xl"
                    >
                      내 책장
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-danger p-4 text-xs sm:text-xs md:text-lg lg:text-xl xl:text-lg 2xl:text-xl"
                      onClick={handleClickLogout}
                    >
                      로그아웃
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div
                className="btn font-bold border-2 text-xs sm:text-base md:text-md lg:text-lg xl:text-xl 2xl:text-2xl "
                onClick={() => {
                  openLoginModal();
                }}
              >
                로그인
              </div>
              <dialog id="authModal" className={`modal`}>
                <div className="modal-box max-h-4xl">
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                  </div>
                  <div className="flex justify-center item-center">
                    <LoginPage />
                  </div>
                </div>
              </dialog>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
