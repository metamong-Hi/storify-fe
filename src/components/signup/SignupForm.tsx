'use client';

import { useState } from 'react';
import Link from 'next/link';

const SignUpPage = () => {
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userID" className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              id="userID"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="
px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
            <Link href="/login">
              <p className="font-medium text-blue-600 hover:text-blue-500">
                Already have an account?
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
