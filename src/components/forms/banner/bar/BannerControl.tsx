'use client';
import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '이 기능을 사용하려면 로그인이 필요합니다.',
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      });
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
