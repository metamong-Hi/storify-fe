"use client"
import React, { useState, useEffect } from 'react';
import MyBook from '@/components/MyBook';
import Header from '@/components/Header';
export default function Page({ params }: { params: { bookId: string } }) {

    const bookId = params.bookId;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // const token = localStorage.getItem('token'); // 로그인 토큰 확인
        const token=sessionStorage.getItem('token');
        setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 간주
    }, []);

    const handleBannerClick = () => {
        if (isLoggedIn) {
            window.location.href = '/email-feedback';
        } else {
            alert("피드백을 남기기 위해서는 로그인이 필요합니다.");
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div 
                className="banner"
                style={{
                    backgroundColor: '#007bff',
                    padding: '10px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onClick={handleBannerClick}
            >
                여러분의 의견이 우리 서비스를 완성합니다. 귀중한 의견을 남겨주세요!
            </div>
          <MyBook bookId={params.bookId} />
        </div>
    );
}
