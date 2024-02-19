'use client';
import React, { useState, useEffect } from 'react';
import Banner from './Banner';

const BannerControl:React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true); 

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);

    const bannerHidden = localStorage.getItem('bannerHidden');
    setIsBannerVisible(bannerHidden !== 'true');
  }, []);

  const handleBannerClick = () => {
    if (isLoggedIn) {
      window.location.href = '/feedback';
    } else {
      alert('피드백을 남기기 위해서는 로그인이 필요합니다.');
    }
  };

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
    localStorage.setItem('bannerHidden', 'true');
  };

  if (!isBannerVisible) return null;

  return <Banner isLoggedIn={isLoggedIn}
  onBannerClick={handleBannerClick}
  onCloseBanner={handleCloseBanner} />;
};

export default BannerControl;
