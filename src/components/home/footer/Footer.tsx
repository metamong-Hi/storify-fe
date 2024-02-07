// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="footer p-10">
      <aside>
        <Link href="/">
          <span className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 font-bold text-[#B68973]" >STORIFY</span>
        </Link>
        <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
          Krafton Jungle Season 3. <br />
          Development since January 11th, 2024
        </p>
        <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-md 2xl:text-lg">jungle.storify@gmail.com</p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <Link href="https://github.com/classbinu/storify-fe" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Image
              src="https://s3.ap-northeast-2.amazonaws.com/storify/public/GitHubIcon-1707114011024.png"
              alt="프론트 엔드"
              width="40"
              height="40"
            />
          </Link>
          <Link href="https://velog.io/@classbinu/" target="_blank" rel="noopener noreferrer" aria-label="Velog">
            <Image
              src="https://s3.ap-northeast-2.amazonaws.com/storify/public/velogIcon-1707114361278.png"
              alt="팀장 개발자 블로그"
              width="40"
              height="40"
            />
          </Link>
          <Link href="https://github.com/classbinu/storify-be" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Image
              src="https://s3.ap-northeast-2.amazonaws.com/storify/public/GitHubIcon-1707114011024.png"
              alt="백 엔드"
              width="40"
              height="40"
            />
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;