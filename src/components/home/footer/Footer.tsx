'use client';
import React, { useMemo }  from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface FooterLinkProps {
  href: string;
  src: string;
  alt: string;
  label: string;
}


const whiteIconThemes: string[] = [
  'luxury', 'dark', 'coffee', 'night', 'halloween',
  'sunset', 'synthwave', 'forest', 'black', 'dracula', 'business',
];

const FooterLink: React.FC<FooterLinkProps> = ({ href, src, alt, label }) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const iconFilter = useMemo(() => whiteIconThemes.includes(theme) ? 'invert(100%)' : 'none', [theme]);

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <div className="flex flex-row gap-4">
        <Image src={src} alt={alt} width="24" height="24" style={{ filter: iconFilter }} />
        <p className="text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg text-base-content ml-2">
          {label}
        </p>
      </div>
    </Link>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-base-200 p-10">
      <aside>
        <Link href="/">
          <h6 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 font-bold text-warning">
            STORIFY
          </h6>
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
        <h6 className="footer-title text-base-content text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">About Us</h6>
        <div className="flex flex-col gap-2">
          <FooterLink
            href="https://github.com/classbinu/storify-fe"
            src="https://s3.ap-northeast-2.amazonaws.com/storify/public/GitHubIcon-1707114011024.png"
            alt="Front End"
            label="FE Repo"
          />
          <FooterLink
            href="https://github.com/classbinu/storify-be"
            src="https://s3.ap-northeast-2.amazonaws.com/storify/public/GitHubIcon-1707114011024.png"
            alt="Back End"
            label="BE Repo"
          />
          <FooterLink
            href="https://velog.io/@classbinu/"
            src="https://s3.ap-northeast-2.amazonaws.com/storify/public/velogIcon-1707114361278.png"
            alt="Team Lead Developer Blog"
            label="Dev Blog"
          />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
