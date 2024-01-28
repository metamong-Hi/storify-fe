'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { logout } from '@/store/userSlice';
import LoginPage from '@/components/login/login';
import { store } from '@/store/index';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Avatar,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Image,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  useDisclosure,
} from '@nextui-org/react';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const pathName = usePathname();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useAppDispatch();
  // const username = useAppSelector(state => state.user.username);
  const realToken = useAppSelector((state) => state.user.token);
  console.log(realToken);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setUsername(localStorage.getItem('username') || '');
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
        localStorage.removeItem('token');
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
    { link: '/home', text: '홈' },
    { link: '/allbooks', text: '책장' },
    { link: '/writing', text: '책 만들기' },
  ];

  return (
    <>
      <Navbar
        maxWidth="2xl"
        height="4rem"
        isBordered
        onMenuOpenChange={setIsMenuOpen}
        className="bg-[#ff4d6d]/80"
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/" className="text-4xl  font-bold duration-300 ease-in-out">
              <span className="text-[#FAF9F6]">STORIFY</span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="text-2xl font-bold hidden sm:flex gap-6" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.link}>
              <Link
                className={`
    ${
      isActive(item.link)
        ? 'text-[#1E212D] bg-[#FBE8E7] border border-transparent rounded-full px-4 py-2 transition transform hover:bg-[#FBE8E7] active:bg-[#FBE8E7] active:scale-90 shadow-md'
        : 'text-[#1E212D] hover:bg-gray-200 active:bg-gray-300 active:scale-95 rounded-full px-4 py-2 transition'
    }`}
                href={item.link}
              >
                {item.text}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          {isLoggedIn ? (
            <>
              <NavbarItem>
                <span className="">
                  <span className="text-[#FBE8E7] text-xl font-bold  pr-2">{username}</span>님
                  환영합니다
                </span>
              </NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    showFallback
                    isBordered
                    color="default"
                    size="  md"
                    src="https://images.unsplash.com/broken"
                    className="mr-2"
                  />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="mypage">마이페이지</DropdownItem>
                  <DropdownItem key="logout" onAction={() => handleClickLogout()} color="danger">
                    로그아웃
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <>
              <NavbarItem>
                {/* <Button as={Link} color="primary" href="/login" variant="flat" size="lg"> */}
                <Button
                  onClick={onOpen}
                  className="font-bold text-[#FBE8E7] border-[#FBE8E7] border-2 bg-[#ff4d6d]  hover:bg-[#B68973] hover:text-[#FAF3E0]"
                  variant="flat"
                >
                  로그인
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                color={isActive(item.link) ? 'primary' : 'foreground'}
                href={item.link}
                className="text-xl "
              >
                {item.text}
              </Link>
            </NavbarMenuItem>
          ))}
          {isLoggedIn ? null : (
            <>
              <NavbarMenuItem>
                <Link href="/login">로그인</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/signup">회원가입</Link>
              </NavbarMenuItem>
            </>
          )}

          <NavbarMenuItem></NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="flex flex-col justify-center items-center p-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{/* 로그인 / 회원가입 */}</ModalHeader>
              <ModalBody className="flex justify-center items-center">
                <LoginPage />
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant='light' onPress={onClose}>
                닫기
              </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NavbarComponent;
