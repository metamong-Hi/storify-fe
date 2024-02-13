'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { set } from 'lodash';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  _id: string;
  avatar?: string;
  createdAt: string;
  email?: string;
  introduction?: string;
  nickname: string;
  userId: string;
  refreshToken: string;
}

async function updateUserProfile(nickname: string, avatar: File | string, introduction: string) {
  try {
    const token = sessionStorage.getItem('token');

    const formData = new FormData();

    if (avatar instanceof File) {
      formData.set('avatar', avatar);
    }
    if (nickname) {
      formData.set('nickname', nickname);
    }
    if (introduction) {
      formData.set('introduction', introduction);
    }
    // formData.set('nickname', nickname);
    // formData.set('avatar', avatar);
    // formData.set('introduction', introduction);

    const obj2: { [key: string]: string } = {};
    formData.forEach((value, key) => (obj2[key] = String(value)));

    console.log(obj2);

    await fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then(() => {
        console.log('프로필 업데이트 성공');
      });
  } catch (error) {
    console.error('프로필 업데이트 실패: ', error);
  }

  //   const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/auth/login`, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ userId, password }),
  // });
  // const response = await fetch(`${API_URL}/users`, {
  //   method: 'PATCH',
  //   body: formData,
  // });

  // return response.json();
}

async function updateUserSecurity(email: string, password: string) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  const response = await fetch(`${API_URL}/users`, {
    method: 'PUT',
    body: formData,
  });

  return response.json();
}

async function getUserProfile(_id: string) {
  const response = await fetch(`${API_URL}/users/${_id}`, {
    method: 'GET',
  });

  return response.json();
}

function setSelectedFile(arg0: File) {}

const SecurityPage = ({ params }: { params: { userID: string } }) => {
  const _id = params.userID;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserProfile(_id);
      console.log(data);
      setUserId(data.userId);
      setEmail(data.email ?? '');
    }; // Add a closing parenthesis here

    fetchData();
  }, [_id]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const hanglePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // updateUserProfile(userId, );
  };

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          이메일 주소
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
        className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
      >
        저장하기
      </button>
    </form>
  );
};

const ProfilePage = ({ params }: { params: { userID: string } }) => {
  const _id = params.userID;

  const [isChanged, setIsChanged] = useState(false);

  const [avatar, setAvatar] = useState<File | string>('');
  const [nickname, setNickname] = useState(''); // Replace with user's current nickname
  const [introduction, setIntroduction] = useState('');

  const [oriAvatar, setOriAvatar] = useState('');
  const [oriNickname, setOriNickname] = useState(''); // Replace with user's current nickname
  const [oriIntroduction, setOriIntroduction] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserProfile(_id);
      console.log(data);
      setOriNickname(data.nickname ?? data.userId);

      setOriAvatar(
        data.avatar ??
          'https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png',
      );
      setOriIntroduction(data.introduction ?? '자기 소개를 입력해주세요');
    };

    fetchData();
  }, [_id]);

  useEffect(() => {
    setIsChanged('' !== avatar || '' !== nickname || '' !== introduction);
  }, [avatar, nickname, introduction]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    console.log(file);
    setAvatar(file || ''); // Provide a default value of an empty string if file is null
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUserProfile(nickname, avatar, introduction);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  function handleIntroductionChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setIntroduction(event.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto my-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-6">
        <Image src={oriAvatar} alt="avatar" width={100} height={100} />
        <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-700">
          Avatar
        </label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          onChange={handleAvatarChange}
          className="block file-input w-full text-sm text-primary-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-primary-700
      hover:file:bg-primary-100"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-700">
          닉네임
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder={oriNickname}
          className="w-full p-4 text-sm border rounded-lg shadow-sm"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="intro" className="block mb-2 text-sm font-medium text-gray-700">
          자기 소개
        </label>
        <input
          id="intro"
          name="intro"
          type="text"
          value={introduction}
          placeholder={oriIntroduction}
          onChange={handleIntroductionChange}
          className="w-full p-4 text-sm border rounded-lg shadow-sm"
        ></input>
      </div>

      <button
        type="submit"
        disabled={!isChanged}
        className={`px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg ${
          isChanged ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        저장하기
      </button>
    </form>
  );
};

const Page = ({ params }: { params: { userID: string } }) => {
  const [settings, setSettings] = useState('profile');

  const settingOptions = [
    { label: '프로필', value: 'profile' },
    { label: '개인 정보', value: 'security' },
  ];

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div role="tablist" className="tabs tabs-lifted">
        {settingOptions.map((option) => (
          <a
            key={option.value}
            role="tab"
            className={`tab whitespace-nowrap text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl ${settings === option.value ? 'tab-active' : ''}`}
            onClick={() => setSettings(option.value)}
          >
            <span className="p-1">{option.label}</span>
          </a>
        ))}
      </div>

      <div className="w-full">
        {settings === 'profile' ? (
          <ProfilePage params={params} />
        ) : (
          <SecurityPage params={params} />
        )}
      </div>
    </div>
  );
};

export default Page;
