'use client';
import React, { useEffect, useState } from 'react';
import { updateUserEmail, updateUserPassword } from '@/services/userService';
import { ProfileData } from '@/types/user';

interface propsType {
  data: ProfileData;
}

interface User {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function SecurityPage(profile: propsType) {
  const [user, setUser] = useState<User>({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState<User>({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(true);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    setUser((prevState) => ({
      ...prevState,
      email: profile.data.email ?? '',
    }));
  }, [profile.data.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    if (name === 'email') setEmailChanged(true);
    if (name === 'currentPassword' || name === 'newPassword' || name === 'confirmNewPassword')
      setPasswordChanged(true);
  };

  const validateEmail = () => {
    let tempErrors: User = {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
    if (user.email === '') tempErrors.email = '이메일 주소를 입력하세요.';
    if (!user.email.includes('@')) tempErrors.email = '올바르지 않은 이메일 주소입니다.';

    setErrors(tempErrors as User);
    for (const key in tempErrors) {
      if (tempErrors[key as keyof typeof tempErrors] !== '') return false;
    }

    return true;
  };

  const validatePassword = () => {
    let tempErrors: User = {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };

    if (user.currentPassword === '') tempErrors.currentPassword = '현재 비밀번호를 입력하세요.';

    if (user.newPassword === '') tempErrors.newPassword = '새로운 비밀번호를 입력하세요.';
    if (user.confirmNewPassword === '')
      tempErrors.confirmNewPassword = '새 비밀번호를 한 번 더 입력하세요.';

    if (user.newPassword === user.currentPassword)
      tempErrors.newPassword = '새로운 비밀번호는 현재 비밀번호와 달라야 합니다.';
    if (user.newPassword !== user.confirmNewPassword)
      tempErrors.confirmNewPassword = '비밀번호가 일치하지 않습니다.';

    setErrors(tempErrors as User);

    for (const key in tempErrors) {
      if (tempErrors[key as keyof typeof tempErrors] !== '') return false;
    }

    return true;
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!validateEmail()) return;

    setLoading(true);
    try {
      await updateUserEmail(user.email);
      setMessage('이메일이 성공적으로 업데이트되었습니다!');
      setShowEmailForm(false);
    } catch (error) {
      setMessage('이메일 업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    const flag = validatePassword();
    if (!flag) return;

    setLoading(true);
    try {
      await updateUserPassword(user.currentPassword, user.newPassword);
      setMessage('비밀번호가 성공적으로 업데이트되었습니다!');
      setShowPasswordForm(false);
    } catch (error: any) {
      if (error.message === '비밀번호 업데이트 실패')
        setMessage('비밀번호 업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto my-8 p-4 md:p-6 bg-white rounded-lg shadow-md w-full max-w-md md:max-w-lg">
        <form onSubmit={handleEmailSubmit} className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            이메일 주소
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            className={`w-full p-3 text-sm border rounded-lg shadow-sm ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          <button
            type="submit"
            disabled={!emailChanged || !showEmailForm}
            className={`mt-4 w-full px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg ${
              emailChanged ? 'hover:bg-primary-700' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            이메일 저장
          </button>
        </form>
      </div>
      <div className="mx-auto my-8 p-4 md:p-6 bg-white rounded-lg shadow-md w-full max-w-md md:max-w-lg">
        <form onSubmit={handlePasswordSubmit}>
          <label
            htmlFor="current-password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            현재 비밀번호
          </label>
          <input
            id="current-password"
            name="currentPassword"
            type="password"
            value={user.currentPassword}
            onChange={handleChange}
            className={`w-full p-3 text-sm border rounded-lg shadow-sm ${
              errors.currentPassword ? 'border-red-500' : ''
            }`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-xs italic">{errors.currentPassword}</p>
          )}

          <label
            htmlFor="new-password"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            새 비밀번호
          </label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            value={user.newPassword}
            onChange={handleChange}
            className={`w-full p-3 text-sm border rounded-lg shadow-sm ${
              errors.newPassword ? 'border-red-500' : ''
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs italic">{errors.newPassword}</p>
          )}

          <label
            htmlFor="confirm-new-password"
            className="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            새 비밀번호 확인
          </label>
          <input
            id="confirm-new-password"
            name="confirmNewPassword"
            type="password"
            value={user.confirmNewPassword}
            onChange={handleChange}
            className={`w-full p-3 text-sm border rounded-lg shadow-sm ${
              errors.confirmNewPassword ? 'border-red-500' : ''
            }`}
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-xs italic">{errors.confirmNewPassword}</p>
          )}

          <button
            type="submit"
            disabled={!passwordChanged || !showPasswordForm}
            className={`mt-4 w-full px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg ${
              passwordChanged ? 'hover:bg-primary-700' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            비밀번호 저장
          </button>
        </form>
      </div>
    </>
  );
}

export default SecurityPage;
