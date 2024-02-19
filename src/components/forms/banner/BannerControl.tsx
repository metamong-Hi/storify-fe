'use client';
import React, { useState, useEffect } from 'react';
import Banner from './Banner';

const BannerControl:React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleBannerClick = () => {
    if (isLoggedIn) {
      window.location.href = '/feedback';
    } else {
      alert('피드백을 남기기 위해서는 로그인이 필요합니다.');
    }
  };

  return <Banner isLoggedIn={isLoggedIn} onBannerClick={handleBannerClick} />;
};

export default BannerControl;
