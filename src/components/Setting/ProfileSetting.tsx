'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { updateUserProfile } from '@/services/userService';
import CameraIcon from '@/components/icons/CameraIcon';
import ImageIcon from '@/components/icons/ImageIcon';
import { ProfileData } from '@/types/user';

interface propsType {
  data: ProfileData;
}

function ProfilePage(profile: propsType) {
  const [isChanged, setIsChanged] = useState(false);
  const [avatar, setAvatar] = useState<File | string>('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [oriAvatar, setOriAvatar] = useState('');
  const [oriNickname, setOriNickname] = useState('');
  const [oriIntroduction, setOriIntroduction] = useState('');

  useEffect(() => {
    try {
      setOriNickname(profile.data.nickname ?? profile.data.userId);
      setOriAvatar(
        profile.data.avatar ||
          'https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png',
      );
      setOriIntroduction(profile.data.introduction ?? '자기 소개를 입력해주세요');
    } catch (error) {
      console.error('유저 프로필을 가져오는 중 오류가 발생했습니다: ', error);
    }
  }, [profile]);

  useEffect(() => {
    setImagePreview(oriAvatar);
  }, [oriAvatar]);

  useEffect(() => {
    if (avatar instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(avatar);
    }
  }, [avatar]);

  useEffect(() => {
    setIsChanged(avatar !== '' || nickname !== '' || introduction !== '');
  }, [avatar, nickname, introduction]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAvatar(file || '');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUserProfile(nickname, avatar, introduction);
      // 성공 시 처리 (예: 성공 메시지 표시 또는 리다이렉션)
    } catch (error) {
      // 오류 시 처리 (예: 오류 메시지 표시)
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-8 p-6 bg-white rounded-lg shadow-md w-full max-w-md sm:max-w-lg"
    >
      <div className="mb-8 flex justify-center item-center space-y-4">
        <label
          htmlFor="avatar"
          className="relative item-center w-24 h-24 overflow-hidden rounded-full cursor-pointer"
        >
          <Image
            src={
              imagePreview ||
              'https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png'
            }
            alt="avatar"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-30 hover:opacity-100 transition-opacity duration-300 ">
            <span className="text-white font-small">
              <ImageIcon />
            </span>
          </div>
        </label>
      </div>

      <label
        htmlFor="nickname"
        className="block mb-4 text-sm md:text-base font-medium text-gray-700"
      >
        닉네임
      </label>
      <input
        id="nickname"
        name="nickname"
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        placeholder={oriNickname}
        className="w-full mb-4 p-3 text-sm md:text-base border rounded-lg shadow-sm"
      />

      <label htmlFor="intro" className="block mb-3 text-sm md:text-base font-medium text-gray-700">
        자기 소개
      </label>
      <textarea
        id="intro"
        name="intro"
        value={introduction}
        placeholder={oriIntroduction}
        onChange={(e) => setIntroduction(e.target.value)}
        className="w-full p-3 text-sm border rounded-lg shadow-sm"
        rows={9}
      />
      <button
        type="submit"
        disabled={!isChanged}
        className={`mt-4 w-full px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg ${
          isChanged ? 'hover:bg-primary-700' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        저장하기
      </button>
    </form>
  );
}

export default ProfilePage;
