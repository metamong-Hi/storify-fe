'use client';

import React, { useEffect, useState } from 'react';
import ProfilePage from '@/components/userSetting/ProfileSetting';
import SecurityPage from '@/components/userSetting/SecuritySetting';
import { getUserInfo } from '@/services/userService';
import { ProfileData } from '@/types/user';

const Page = ({ params }: { params: { userID: string } }) => {
  const { userID } = params;

  const [settings, setSettings] = useState('profile');
  const [message, setMessage] = useState('');

  const [profileData, setProfileData] = useState<ProfileData>({
    avatar: '',
    userId: '',
    nickname: '',
    introduction: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const settingOptions = [
    { label: '프로필 수정', value: 'profile' },
    { label: '개인 정보 수정', value: 'security' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserInfo(userID);
        setProfileData(data);
        console.log(data);
      } catch (error) {
        setMessage('프로필 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userID]);

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div role="tablist" className="tabs tabs-lifted md:hidden">
        {settingOptions.map((option) => (
          <a
            key={option.value}
            role="tab"
            className={`tab tab-lg whitespace-nowrap ${settings === option.value ? 'tab-active' : ''}`}
            onClick={() => setSettings(option.value)}
          >
            {option.label}
          </a>
        ))}
      </div>
      {message && (
        <p
          className={`text-${message.includes('실패') ? 'error' : 'success'}-500 text-xs italic mb-4`}
        >
          {message}
        </p>
      )}

      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className={`flex-1 p-5 ${settings !== 'profile' ? 'hidden md:block' : ''}`}>
          <ProfilePage data={profileData} />
        </div>
        <div className={`flex-1 p-5 ${settings !== 'security' ? 'hidden md:block' : ''}`}>
          <SecurityPage data={profileData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
