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
import SettingsComponent from './Setting/Theme';
import { disconnectWebSocket } from '@/utils/websocket';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  useDisclosure,
} from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const pathName = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const theme = useSelector((state : RootState) => state.theme.value);

  const isWhiteIconTheme = ['luxury', 'dark', 'coffee', 'night', 'halloween', 'sunset', 'synthwave', 'forest', 'black', 'dracula', 'business'].includes(theme);
  const iconFilter = isWhiteIconTheme ? 'invert(100%)' : 'none';

  const dispatch = useAppDispatch();
  const realToken = useAppSelector((state) => state.user.token);
  console.log(realToken);

  useEffect(() => {
    const storedTheme = localStorage.getItem('selectedTheme');
    if (storedTheme) {
      setSelectedTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }, []);

  const [selectedTheme, setSelectedTheme] = useState<string>('selectedTheme');

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
        disconnectWebSocket();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('nickname');
        setIsLoggedIn(false);
        
        // window.location.href='/';
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
      <div className="navbar bg-base-100 p-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ filter: iconFilter }}
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
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item, index) => (
                <Link key={index} href={item.link}>
                  <li className=" text-xl p-2 xl:text-2xl font-bold">
                    <span className={`text-base-content ${isActive(item.link) ? 'bg-base-200' : ''} menu-item p-4`}>
                      {item.text}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className=" justify-start p-5 sm:px-5 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
            <Link href="/" className="text-xl lg:text-3xl font-bold ">
              <span className="text-base-content text-warning">STORIFY</span>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.link}>
                <li className="block lg:inline-block text-lg lg:mx-2">
                  <span className={`text-base-content ${isActive(item.link) ? 'bg-base-200' : ''}`}>
                    {item.text}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex navbar-end p-5 sm:px-5 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
          {isLoggedIn ? (
            <>
              <span className="text-base-content">
                <span className=" text-xl font-bold pr-2">{nickname}</span>님 환영합니다
              </span>
              <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-6 rounded-full">
                    <Image
                      alt="Tailwind CSS Navbar component"
                      src="https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png"
                      width={10}
                      height={10}
                      style={{ filter: iconFilter }}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-10 p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={`/user/${userId}/bookshelf`} className="p-4 text-base-content">
                      내 책장
                    </Link>
                  </li>
                  {/* <li>
                    <Link href={`/user/${userId}/profile`} className="p-4 text-base-content">
                      프로필
                    </Link>
                  </li> */}
                  <li>
                    <Link href={`/setting`} className="p-4 text-base-content">
                      환경 설정
                    </Link>
                  </li>
                  <li>
                    <div className="text-danger p-4" onClick={() => handleClickLogout()}>
                      로그아웃
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/setting" passHref>
                  <button className="btn btn-outline font-bold mr-2">환경설정</button>
                </Link>
                <button onClick={onOpen} className="btn btn-outline font-bold">
                  로그인
                </button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent className="flex flex-col justify-center items-center p-4">
                    {(_onClose: any) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          {/* 로그인 / 회원가입 */}
                        </ModalHeader>
                        <ModalBody className="flex justify-center items-center">
                          <LoginPage />
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
