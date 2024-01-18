"use client"
import React, { useState } from 'react';
import { SignupData } from '@/types/user';
import styled from 'styled-components';
const StyledSignupPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form-container {
    display: flex; // Flex 컨테이너 설정
    gap: 5px; // 폼 사이의 간격
  }
  .fairy{
    width: 600px;
    height: 800px;
    box-shadow: 0px 20px 20px rgba(0.1, 0.1, 0.1, 0.8);
    padding:20px;
  }
  .form {
    width: 600px;
    height: 800px;
    box-shadow: 20px 20px 45px rgba(0.1, 0.1, 0.1, 0.8);
    padding:20px;
    

  }
  .content{
    justify-content: center;
    align-items: center;
  }


`;
//hi
const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupData>({ username: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://storify-be.fly.dev/api/auth/register', { // '/api/signup'은 서버의 회원가입 처리 API 경로
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      console.log(data); // 회원가입 결과 처리
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <>
    <StyledSignupPage>
    <div className="form-container">
    <div className='fairy'>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                  src="/images/angels/signUp.png"
                  alt="fairy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              </div>
    </div>
    <form onSubmit={handleSubmit} className="form max-w-md mx-auto">
    <div className="content">
      <div className="mb-4">
        <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2 mt-2'>이름</label>
      <input
        type="text"
        name="username"
        placeholder="이름"
        value={formData.username}
        onChange={handleChange}
        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
        <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2 mt-2'>이메일</label>
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2 mt-2'>비밀번호</label>
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />  
      <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2 mt-2'>비밀번호 확인</label>
      <input
        type="password"
        name="password"
        placeholder="비밀번호 확인"
        // value={formData.password}
        // onChange={handleChange}
        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 rounded focus:outline-none focus:shadow-outline">
          확인
        </button>
      </div>
      </div>
      </div>
    </form>

    </div>
    </StyledSignupPage>
    </>
  );
};

export default SignupPage;
