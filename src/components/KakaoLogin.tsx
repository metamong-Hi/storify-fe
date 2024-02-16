"use client"
import React from 'react';

const KakaoLogin: React.FC = () => {

  const sendApiRequest = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/userInfo`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={sendApiRequest}>카카오 로그인 완료하기</button>
    </div>
  );
};

export default KakaoLogin;
