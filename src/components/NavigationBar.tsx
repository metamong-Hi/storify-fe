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

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const pathName = usePathname();

  const dispatch = useAppDispatch();
  const realToken = useAppSelector((state) => state.user.token);
  console.log(realToken);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      setNickname(sessionStorage.getItem('nickname') || '');
      if (token) {
        const id = jwtDecode(token);
        setUserId(id.sub || '');
      }

      setIsLoggedIn(!!token);
    }
  }, []);

  const handleClickLogout = () => {
    dispatch(logout())
      .then(() => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        alert('로그아웃');
      })
      .catch((error) => {
        console.log('로그아웃 망함' + error);
      });
  };

  const isActive = (pathname: string) => {
    return pathName === pathname;
  };

  const menuItems = [
    // { link: '/home', text: '홈' },
    { link: '/allbooks', text: '책장' },
    { link: '/writing', text: '책 만들기' },
  ];

  return (
    <>
      <div className="navbar bg-base-100 p-5">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item, index) => (
                <li key={index} className="p-4 text-xl xl:text-2xl font-bold">
                  <Link href={item.link}>
                    <span className={`${isActive(item.link) ? 'bg-base-200' : ''} menu-item `}>
                      {item.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className=" pl-15">
            <Link href="/" className=" xl:text-4xl  font-bold ">
              <span>STORIFY</span>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>
                  <span className={`${isActive(item.link) ? 'bg-base-200' : ''} menu-item`}>
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <>
              <span className="">
                <span className=" text-xl font-bold  pr-2">{nickname}</span>님 환영합니다
              </span>
              <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-6 rounded-full">
                    <Image
                      alt="Tailwind CSS Navbar component"
                      src="https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png"
                      width={10}
                      height={10}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={`/user/${userId}/bookshelf`} className="p-2">
                      내 책장
                    </Link>
                  </li>
                  <li>
                    <Link href={`/user/${userId}/profile`} className="p-2">
                      프로필
                    </Link>
                  </li>
                  <li>
                    <div className="bg-danger" onClick={() => handleClickLogout()}>
                      로그아웃
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <div
                  className="btn font-bold border-2 hover:"
                  onClick={() => {
                    const modal = document.getElementById('authModal');
                    if (modal) {
                      const modalElement = document.getElementById(
                        'authModal',
                      ) as HTMLDialogElement;
                      modalElement.showModal();
                    }
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
                    <LoginPage />
                  </div>
                </dialog>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
