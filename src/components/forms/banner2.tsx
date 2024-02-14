// components/Banner.tsx
import React from 'react';

interface BannerProps {
    isLoggedIn: boolean;
    onBannerClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ isLoggedIn, onBannerClick }) => {
    return (
        <div 
            className="bg-accent p-2.5 text-accent-content text-center text-base-content font-bold text-lg cursor-pointer transition-colors duration-300 ease-in-out"
            onClick={onBannerClick}
        >
            여러분의 의견이 우리 서비스를 완성합니다. 귀중한 의견을 남겨주세요!
        </div>
    );
};

export default Banner;
