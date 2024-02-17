import React from 'react';

interface BannerProps {
  isLoggedIn: boolean;
  onBannerClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ isLoggedIn, onBannerClick }) => {
  return (
    <div
      className="bg-accent p-2 text-accent-content text-center text-base-content font-bold text-md sm:text-lg cursor-pointer transition-colors duration-300 ease-in-out"
      onClick={onBannerClick}
    >
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
        <p>여러분의 의견이 우리 서비스를 완성합니다.</p>
        <p>귀중한 의견을 남겨주세요!</p>
      </div>
    </div>
  );
};

export default Banner;
