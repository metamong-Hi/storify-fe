// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-10 bg-[#FAF3E0]/80 text-primary-content glass" >
      <aside>
        <Link href="/" className="text-4xl font-bold duration-300 ease-in-out mb-2">
              <span className="text-[#B68973]">STORIFY</span>
            </Link>
        <p className=" text-lg font-bold">
          Krafton Jungle Season 3. <br/>Development since January 11th, 2024
        </p> 
        <p className=" text-lg">kimbh7391@gmail.com</p>
        <p className=" text-lg">Copyright © 2024 - All right reserved</p>
      </aside> 
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link href="https://github.com/classbinu/storify-fe" aria-label="GitHub">
            <Image 
              src = "https://s3.ap-northeast-2.amazonaws.com/storify/public/GitHubIcon-1707114011024.png"
              alt = "프론트 엔드"
              width = "40"
              height = "40"
            />
          </Link>
          <Link href="https://velog.io/@classbinu/" aria-label="Velog">
            <Image 
              src = "https://s3.ap-northeast-2.amazonaws.com/storify/public/velogIcon-1707114361278.png"
              alt = "팀장 개발자 블로그"
              width = "40"
              height = "40"
            />
          </Link>
          <Link href="https://github.com/classbinu/storify-be" aria-label="GitHub">
            <Image 
              src = "https://s3.ap-northeast-2.amazonaws.com/storify/public/GitHubIcon-1707114011024.png"
              alt = "백 엔드"
              width = "40"
              height = "40"
            />
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
