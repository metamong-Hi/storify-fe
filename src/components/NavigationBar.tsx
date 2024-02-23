'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { logout } from '@/store/userSlice';
import LoginPage from '@/components/login/realLogin';
import RegisterPage from './login/realRegister';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { set } from 'lodash';
import SettingsComponent from './userSetting/Theme';
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
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const pathName = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedNotifications = sessionStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
      // console.log('여기다 확인해라' + notifications);
    }
  }, []);

  // 로그인 모달 상태
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onOpenChange: onLoginOpenChange,
  } = useDisclosure();
  // 회원가입 모달 상태
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onOpenChange: onRegisterOpenChange,
  } = useDisclosure();

  const theme = useSelector((state: RootState) => state.theme.value);
  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    sessionStorage.removeItem('notifications');
  };
  // notifications.forEach((notification, index) => {
  //   console.log(`Notification ${index}:`, notification.senderId);
  // });
  useEffect(() => {
    // 클릭 이벤트 리스너 등록
    document.addEventListener('click', handleNotificationsClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleNotificationsClick);
    };
  }, [showNotifications]); 
  const isWhiteIconTheme = [
    'luxury',
    'dark',
    'coffee',
    'night',
    'halloween',
    'sunset',
    'synthwave',
    'forest',
    'black',
    'dracula',
    'business',
  ].includes(theme);
  const iconFilter = isWhiteIconTheme ? 'invert(100%)' : 'none';

  const dispatch = useAppDispatch();
  const realToken = useAppSelector((state) => state.user.token);
  // console.log(realToken);

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
        sessionStorage.removeItem('notifications');
        setIsLoggedIn(false);

        window.location.href = '/';
      })
      .catch((error) => {
        // console.log('로그아웃 망함' + error);
      });
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isActive = (pathname: string) => {
    return pathName === pathname;
  };

  const menuItems = [
    // { link: '/home', text: '홈' },
    { link: '/allbooks', text: '책장' },
    { link: '/writing', text: '책 만들기' },
    // { link: '/user-setting',text:'환경설정'}
  ];
  const menuReal = [
    { link: '/allbooks', text: '책장' },
    { link: '/writing', text: '책 만들기' },
  ];

  const handleLogoClick = () => {
    if (pathName === '/') {
      window.location.reload();
    } else {
      router.push('/');
    }
  };

  const handleMenuItemClick = (link: string) => {
    if (link === '/writing' && !isLoggedIn) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '책을 만들기 위해서는 로그인이 필요합니다.',
        confirmButtonText: '확인',
      });
    } else {
      // 그 외의 경우에는 해당 링크로 라우팅
      router.push(link);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
              className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item, index) => (
                <Link key={index} href={item.link}>
                  <li>
                    <span
                      className={`text-lg xl:text-xl font-bold text-base-content ${isActive(item.link) ? 'bg-base-200' : ''} menu-item p-2`}
                    >
                      {item.text}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className=" justify-start p-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div
              onClick={handleLogoClick}
              className="text-3xl lg:text-4xl font-bold cursor-pointer"
            >
              <span className="text-base-content text-warning">STORIFY</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-2">
            {menuReal.map((item, index) => (
              <li
                key={index}
                className="block lg:inline-block text-xl lg:mx-2"
                onClick={() => handleMenuItemClick(item.link)}
              >
                <span
                  className={` cursor-pointer text-xl text-base-content ${isActive(item.link) ? 'bg-base-200' : ''}`}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex navbar-end p-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          {isLoggedIn ? (
            <>
              <span className="flex flex-row items-center text-base-content">
                <span className=" text-xl font-bold pr-1 hidden sm:block">{nickname}</span>
                <span className="hidden sm:block">님 환영합니다</span>
              </span>
              <div className="relative z-20 mr-1">
                <button onClick={handleNotificationsClick} className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ filter: iconFilter }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3c0 .667-.333 1.333-1 2L4 17h5m6 0a3.5 3.5 0 01-7 0m7 0h-7"
                    />
                  </svg>
                </button>
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white text-lg">
                    {notifications.length}
                  </span>
                )}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ul>
                      {notifications.map((notification, index) => (
                        <li key={index} className="p-2 border-b text-lg border-gray-200">
                          {(notification as any).message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full">
                    <Image
                      alt="Tailwind CSS Navbar component"
                      src="https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png"
                      width={128}
                      height={128}
                      style={{ filter: iconFilter }}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 relative z-20 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link
                      href={`/user/${userId}/bookshelf`}
                      className="p-2 text-lg text-base-content"
                    >
                      내 책장
                    </Link>
                  </li>
                  <li>
                    <Link href={`/user-setting`} className="p-2 text-lg text-base-content">
                      환경설정
                    </Link>
                  </li>

                  {/* <li>
                    <Link href={`/user/${userId}/profile`} className="p-2 text-lg text-base-content">
                      프로필
                    </Link>
                  </li> */}
                  <li>
                    <div className="text-danger p-2 text-lg " onClick={() => handleClickLogout()}>
                      로그아웃
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  onClick={onLoginOpen}
                  className="btn btn-outline mr-2 font-bold text-md lg:text-lg xl:text-xl 2xl:text-2xl "
                >
                  로그인
                </button>

                <button
                  onClick={onRegisterOpen}
                  className="btn btn-outline font-bold text-md lg:text-lg xl:text-xl 2xl:text-2xl "
                >
                  회원가입
                </button>

                <Modal isOpen={isLoginOpen} onOpenChange={onLoginOpenChange}>
                  <ModalContent className="flex flex-col justify-center items-center p-4">
                    {(_onClose: any) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody className="flex justify-center items-center">
                          <LoginPage />
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                <Modal isOpen={isRegisterOpen} onOpenChange={onRegisterOpenChange}>
                  <ModalContent className="flex flex-col justify-center items-center p-4">
                    {(_onClose: any) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody className="flex justify-center items-center">
                          <RegisterPage />
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
