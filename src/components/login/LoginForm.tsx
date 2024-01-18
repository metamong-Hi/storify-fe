'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
    };

    const handleKakaoLogin = () => {
        // Kakao login logic goes here
        console.log('Kakao login logic goes here');
    };

    const handleNaverLogin = () => {
        // Kakao login logic goes here
        console.log('Naver login logic goes here');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            이메일
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <Image
                        onClick={handleKakaoLogin}
                        src={'/public/images/kakao/kakao_login_large_narrow.png'}
                        alt="카카오 로그인 버튼"
                        height={44}
                        width="222"
                    />
                    <Image
                        onClick={handleNaverLogin}
                        src={'/public/images/Naver/btnW_완성형.png'}
                        alt="네이버 로그인 버튼"
                        height={44}
                        width="222"
                    />

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Log In
                        </button>
                        <Link href="/signup">
                            <p className="text-sm text-indigo-600 hover:underline">Sign up</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
