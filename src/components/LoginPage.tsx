"use client"
import React, { useState } from 'react';
import { LoginData } from '@/types/auth';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link'; 
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
// import { setToken } from '../store/userSlice';
import {login}from '../store/userSlice';
// import { login, loginSuccess } from '../store/actions';

// import { login } from '../store/userSlice'; // login 액션 import
const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form-container {
    display: flex; 
    gap: 5px; 
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
interface SimpleWritingFormProps {
  destination: string; 
}
const LoginPage: React.FC = () => {

  const [formData, setFormData] = useState<LoginData>({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(state => state.user.status);
  const loginError = useAppSelector(state => state.user.error);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username: formData.username, password: formData.password })) .then(() => {
      window.location.reload(); 
    })
    .catch((error) => {
      console.error("로그인 실패: ", error);
    });
    console.log("여기까지 왔다");

  };

  return (
    <>
  <StyledLoginPage>
  <div className="form-container">
    <div className='fairy'>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="w-100 h-100">
        <Image
            src="/Images/angels/login.png"
            alt="Sign Up"
            width={0}  
            height={0} 
            sizes="100vw"
            style={{width:'100%',height:'100%'}}
        />
        </div>
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
  
      <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2 mt-2'>비밀번호</label>
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />  
    
      <div className="flex items-center justify-between">
        {/* <Link href="/"> */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 rounded focus:outline-none focus:shadow-outline">
          확인
        </button>
       
        {loginStatus === 'loading' && <p>로그인 시도 중...</p>}
              {loginStatus === 'failed' && <p>로그인 실패: {loginError}</p>}
        {/* </Link> */}
      </div>
      </div>
      </div>
    </form>

    </div>
    </StyledLoginPage>
    </>
  );
};

export default LoginPage;
