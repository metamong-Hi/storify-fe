'use client';

import { ProfileData } from '@/types/user';
import { set } from 'lodash';
import { redirect } from 'next/dist/server/api-utils';
import { useState } from 'react';
interface propsType {
  data: ProfileData;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function Login(userId: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ userId, password }),
  });

  return response.json();
}

export default function CheckAgain(profile: propsType) {
  const userId = profile.data.userId;
  const [password, setPassword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await Login(userId, password);
    } catch (error) {}
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleLoginSubmit}>
      <input placeholder={userId} type="text" name="userId" />
      <input
        placeholder="비밀번호를 입력하세요"
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
      />

      <div className="flex gap-6 justify-end">
        <button type="submit">로그인</button>
      </div>
    </form>
  );
}
