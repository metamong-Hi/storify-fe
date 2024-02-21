import React from 'react';

interface BannerProps {
  isLoggedIn: boolean;
  onBannerClick: () => void;
  onCloseBanner: () => void;
}

const Banner: React.FC<BannerProps> = ({ isLoggedIn, onBannerClick, onCloseBanner }) => {
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseBanner();
  };

  return (
    <div
      className=" flex flex-row justify-between bg-accent p-4 text-accent-content text-center text-accent-content font-bold text-lg sm:text-xl lg:text-2xl cursor-pointer transition-colors duration-300 ease-in-out"
      onClick={onBannerClick}
    >
      <div></div>
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
        <h1>여러분의 의견이 우리 서비스를 완성합니다.</h1>
        <h2>귀중한 의견을 남겨주세요!</h2>
      </div>
      <div>
        <button
          onClick={handleCloseClick}
          style={{ outline: 'none', background: 'transparent', border: 'none' }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Banner;
