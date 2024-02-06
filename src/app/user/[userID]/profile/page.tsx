'use client';

import React, { useState } from 'react';

const ProfilePage = () => {
  const [nickname, setNickname] = useState('CurrentNickname'); // Replace with user's current nickname
  const [email, setEmail] = useState('user@example.com'); // Replace with user's current email
  const [password, setPassword] = useState('');
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedFile(event.target.files[0]);
    // You can add logic to preview the image here
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to update the user profile
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const hanglePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-6">
        <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-700">
          Avatar
        </label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          onChange={handleAvatarChange}
          className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-700">
          Nickname
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="Your nickname"
          className="w-full p-4 text-sm border rounded-lg shadow-sm"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="you@example.com"
          className="w-full p-4 text-sm border rounded-lg shadow-sm"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          비밀번호 변경
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={hanglePasswordChange}
          placeholder=""
          className="w-full p-4 text-sm border rounded-lg shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
      >
        Update profile
      </button>
    </form>
  );
};

export default ProfilePage;
function setSelectedFile(arg0: File) {
  throw new Error('Function not implemented.');
}
