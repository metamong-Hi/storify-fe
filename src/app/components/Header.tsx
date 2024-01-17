
"use client"             
// components/Header.tsx
import React,{useState,useEffect} from "react";
// import '../styles/globals.css';
// import { useRouter } from "next/router"; ->클라이언트 기반 렌더링임 (Link로 변경 1/17일 수정함)

interface HeaderProps {

}
//헤더 반응형 완성 - 로그인/로그아웃 상태에 따른 메뉴 상태 추가 (1/16일 수정함)
const Header: React.FC<HeaderProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();
  // 여기 수정함 1/16 토글 버튼 ->menu 오픈 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickBook=()=>{
    // router.push('/book');
  }
  const handleClickHome=()=>{
    // router.push('/');
  }
  const name="민상기";
  return (
    <header className='shadow-md font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-4 px-10 py-4 relative bg-white min-h-[70px] lg:flex-grow'>
        {/*왼쪽 정렬*/}
        <div className='flex items-center gap-4'>
          <a href="javascript:void(0)" onClick={handleClickHome}>
            <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
          </a>
          {/*여기 수정해야함 -> 라우팅 방식 바뀜*/}

          <a href='javascript:void(0)'
            className='lg:hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]' onClick={handleClickBook}>Book</a>
        </div>
    
        {/* 오른쪽 정렬*/}
        <div className='flex justify-end'>
        <div className='lg:hidden'>
            
            <button id="toggle" onClick={toggleMenu} className="justify-end">
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
            </button>
          </div>
    
      <ul id="collapseMenu" className={`absolute lg:relative lg:flex lg:space-x-4 ${isMenuOpen ? 'right-0' : '-right-full'} lg:right-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all duration-300 ease-in-out lg:block py-4 lg:py-0 h-screen lg:h-auto`}>
      
        {/* <h5 className="hidden md:block ">{name}님 환영합니다</h5> */}
            <button className="absolute top-0 right-0 mt-4 mr-4 lg:hidden" onClick={() => setIsMenuOpen(false)}>
                X
             </button>
             {isLoggedIn ? (
                <>
                {!isMenuOpen && <h5 className="hidden sm:block md:block">{name}님 환영합니다</h5>}
                <li className={`py-2 px-3 lg:py-0 lg:px-4 ${isMenuOpen ? 'mt-8' : ''}`}> {/* 'mt-8'는 Tailwind의 마진 클래스입니다 */}
            <a href='#' className='text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block' onClick={() => setIsLoggedIn(false)}>Logout</a>
        </li>
        </>
      ) : (
        <>
            <li className={`border-b lg:border-none py-2 px-3 lg:py-0 lg:px-4' ${isMenuOpen?'mt-8':''}`}>
         
            <a href='#'
             className='text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block'>Login</a>
            </li>
            <li className={`border-b lg:border-none py-2 px-3 lg:py-0 lg:px-4' ${isMenuOpen?'mt-4':''}`}>
         
             <a href='#'
                 className='text-[#333] block font-semibold text-[15px] hover:text-[#007bff] lg:inline-block'>Register</a>
            </li>
        </>  )}
     </ul>
    </div>
        
    </div>
</header>
);
 

};
export default Header;
            
