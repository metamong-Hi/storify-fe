// components/Banner.tsx
import React from 'react';

interface BannerProps {
    isLoggedIn: boolean;
    onBannerClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ isLoggedIn, onBannerClick }) => {
    return (
        <div 
            className="banner"
            style={{
                backgroundColor: '#E6E6FA',
                padding: '10px',
                borderRadius: '15px',
                textAlign: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
            }}
            onClick={onBannerClick}
        >
            여러분의 의견이 우리 서비스를 완성합니다. 귀중한 의견을 남겨주세요!
        </div>
    );
};

export default Banner;
