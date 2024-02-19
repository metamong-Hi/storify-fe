'use client';
import React, { useState } from 'react';
import { LoginData } from '@/types/auth';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react';
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { login } from '@/store/userSlice';
import { signup } from '@/store/userSlice';
import Swal from 'sweetalert2';

function ResetPasswordPage() {
  const [selected, setSelected] = useState('login');

  // const [formData, setFormData] = useState<LoginData>({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector((state) => state.user.status);
  const loginError = useAppSelector((state) => state.user.error);

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const showLoginSuccessAlert = () => {
    Swal.fire({
      title: `로그인 성공`,
      text: '로그인에 성공했어요!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  const showLoginFailedAlert = () => {
    Swal.fire({
      title: `로그인 실패`,
      text: '로그인에 실패했어요!',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  const showSignupSuccessAlert = () => {
    Swal.fire({
      title: `회원가입 성공`,
      text: '회원가입에 성공했어요!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  const showSignupFailedAlert = () => {
    Swal.fire({
      title: `회원가입 실패`,
      text: '회원가입에 실패했어요!',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ userId: formData.userId, password: formData.password }))
      .then(() => {
        
        showLoginSuccessAlert();
      })
      .catch((error) => {
        console.error('로그인 실패: ', error);
        showLoginFailedAlert();
      });
 
  };

  const [formSignupData, setFormSignupData] = useState({
    userId: '',
    email: '',
    password: '',
  });
  const handleInputChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormSignupData({
      ...formSignupData,
      [name]: value,
    });
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signup({
        userId: formSignupData.userId,
        password: formSignupData.password,
      }),
    )
      .then(() => {
        showSignupSuccessAlert();
      })
      .catch((error) => {
        console.log('회원가입 실패: ********* ', error);
        showSignupFailedAlert();
      });

  };
  const handleSelectionChange = (key: string | number) => {
    setSelected(String(key));
  };
  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
                <p>비밀번호 재설정</p>
              <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
                <Input
                  isRequired
                  label="비밀번호"
                  placeholder="현재 비밀번호를 입력하세요"
                  type="text"
                  name="username"
                  value={formData.userId}
                  onChange={handleInputChange}
                />
                <Input
                  isRequired
                  label="비밀번호"
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <p className="text-center text-small">
                  계정이 없으신가요?{' '}
                  <Link
                    size="sm"
                
                    onPress={() => setSelected('sign-up')}
                  >
                    회원가입
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth>
                    로그인
                  </Button>
                </div>
              </form>
     
              <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSignUpSubmit}>
                <Input
                  isRequired
                  label="이름"
                  placeholder="이름을 입력하세요"
                  type="text"
                  name="username"
                  value={formSignupData.userId}
                  onChange={handleInputChangeSignup}
                />
                <Input
                  isRequired
                  label="비밀번호"
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  name="password"
                  value={formSignupData.password}
                  onChange={handleInputChangeSignup}
                />
                <Input
                  isRequired
                  label="이메일"
                  placeholder="이메일을 입력하세요"
                  type="email"
                  name="email"
                  value={formSignupData.email}
                  onChange={handleInputChangeSignup}
                />
                <p className="text-center text-small">
                  이미 계정이 있으신가요?{' '}
                  <Link size="sm"  onPress={() => setSelected('login')}>
                    로그인
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth >
                    회원가입
                  </Button>
                </div>
              </form>
        
        </CardBody>
      </Card>
    </div>
  );
}

export default ResetPasswordPage;
