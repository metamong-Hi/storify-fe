'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Footer: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.value);

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
  return (
    <footer className="footer bg-base-200 p-10">
      <aside>
        <Link href="/">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 font-bold text-warning">
            STORIFY
          </h1>
        </Link>
        <p className="text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg text-base-content">
          Krafton Jungle Season 3. <br />
          Development since January 11th, 2024
        </p>
        <p className="text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg text-base-content">
          jungle.storify@gmail.com
        </p>
      </aside>
      <nav>
        <h2 className="footer-title text-base-content text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">About Us</h2>
        <div className="flex flex-col gap-2">
          <Link
            href="https://github.com/classbinu/storify-fe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <div className="flex flex-row gap-4">
              <Image
                src="https://s3.ap-northeast-2.amazonaws.com/storify/public/GitHubIcon-1707114011024.png"
                alt="프론트 엔드"
                width="24"
                height="24"
                style={{ filter: iconFilter }}
              />
              <p className="text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg text-base-content">
                FE Repo
              </p>
            </div>
          </Link>
          <Link
            href="https://github.com/classbinu/storify-be"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <div className="flex flex-row gap-4">
              <Image
                src="https://s3.ap-northeast-2.amazonaws.com/storify/public/GitHubIcon-1707114011024.png"
                alt="백 엔드"
                width="24"
                height="24"
                style={{ filter: iconFilter }}
              />
              <p className="text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg text-base-content">
                BE Repo
              </p>
            </div>
          </Link>
          <Link
            href="https://velog.io/@classbinu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Velog"
          >
            <div className="flex flex-row gap-4">
              <Image
                src="https://s3.ap-northeast-2.amazonaws.com/storify/public/velogIcon-1707114361278.png"
                alt="팀장 개발자 블로그"
                width="24"
                height="24"
                style={{ filter: iconFilter }}
              />
              <p className="text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg text-base-content">
                Dev Blog
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
