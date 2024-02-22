'use client';
import React, { useState } from 'react';
import { LoginData } from '@/types/auth';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react';
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { kakaologin, login, setSignupSuccess } from '@/store/userSlice';
import { signup } from '@/store/userSlice';
import Swal from 'sweetalert2';
import { showSignupModal } from '../signup/SignupModal';
import styled from 'styled-components';
import Image from 'next/image';

const StyledLink = styled(Link)`
  color: '#FFC4D0';
  cursor: pointer;

  &:hover {
  }
`;
function LoginPage() {
  const [selected, setSelected] = useState('login');

  // const [formData, setFormData] = useState<LoginData>({ username: '', password: '' });
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState('');

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
  const handleKakaoLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Kakao login clicked');
    window.location.href = 'https://api.storifyai.site/auth/kakao';
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
        dispatch(setSignupSuccess(1));
        setSelected('login');
      } 
    });
  };
  const showSignupFailedAlert = () => {
    Swal.fire({
      title: `회원가입이 실패했어요 다시 시도해보세요!`,
      text: '',
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
    if (name == 'password' || name == 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ userId: formData.userId, password: formData.password }))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          console.log('로그인 성공');
          const token = sessionStorage.getItem('token');
          console.log('로그인 후에 토큰이 잘 전달되는지' + token);
          if (token) {
            import('@/utils/websocket')
              .then(({ initializeWebSocket }) => {
                initializeWebSocket(token);
              })
              .catch((err) => console.error('웹소켓 연결 실패:', err));
          }

          window.location.reload();
        } else {
          throw new Error('로그인 실패');
        }
      })
      .catch((error) => {
        console.error('로그인 실패: ', error);
        showLoginFailedAlert();
      });
    console.log('여기까지 왔다'); //테스트
  };

  const [formSignupData, setFormSignupData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
  });
  const handleInputChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormSignupData({
      ...formSignupData,
      [name]: value,
    });
    if (name === 'userId') {
      setUserIdError('');

      if (!/^[a-z0-9]+$/.test(value)) {
        setUserIdError('아이디는 영어 소문자와 숫자만 사용할 수 있습니다.');
      } else if (value.length < 3 || value.length > 10) {
        setUserIdError('아이디는 3자에서 10자 사이로 입력해주세요.');
      } else {
        setUserIdError('');
      }
    } else if (name === 'password') {
      setPasswordLengthError('');
      if (value.length < 4) {
        setPasswordLengthError('비밀번호는 4자 이상 입력해주세요.');
      }
    }
    if (
      (name === 'password' && formSignupData.confirmPassword !== '') ||
      name === 'confirmPassword'
    ) {
      if (formSignupData.password !== formSignupData.confirmPassword) {
        if (value !== formSignupData.password) {
          setPasswordError('비밀번호가 일치하지 않습니다');
        } else {
          setPasswordError('');
        }
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formSignupData.password !== formSignupData.confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다');
      return;
    }
    dispatch(
      signup({
        userId: formSignupData.userId,
        password: formSignupData.password,
      }),
    )
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          console.debug('회원가입 성공');
          showSignupSuccessAlert();
        } else {
          throw new Error('회원가입 실패');
        }
      })
      .catch((error) => {
        console.debug('회원가입 실패: ********* ', error);
        showSignupFailedAlert();
      });
  };
  const handleSelectionChange = (key: string | number) => {
    setSelected(String(key));
  };
  return (
    <div className=" max-w-full w-[340px] min-h-[400px] h-auto gap-10">
      {/* <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden"> */}
      <Tabs
        fullWidth
        size="lg"
        aria-label="Tabs form"
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
      >
        <Tab key="login" title="로그인">
          <form className="flex flex-col gap-6 min-h-[300px] h-auto" onSubmit={handleLoginSubmit}>
            <Input
              isRequired
              label="아이디"
              placeholder="아이디를 입력하세요"
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
            />
            {userIdError && <p style={{ color: 'red' }}>{userIdError}</p>}
            <Input
              isRequired
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {passwordLengthError && <p style={{ color: 'red' }}>{passwordLengthError}</p>}
            <p className="text-center text-small">
              계정이 없으신가요?{' '}
              <StyledLink size="lg" onPress={() => setSelected('sign-up')}>
                회원가입
              </StyledLink>
            </p>
            <div className="flex gap-6 justify-end">
              <Button type="submit" fullWidth style={{ backgroundColor: '#FFC4D0' }}>
                로그인
              </Button>
            </div>
          </form>
        </Tab>
        <Tab key="sign-up" title="회원가입">
          <form className="flex flex-col gap-6 min-h-[300px] h-auto" onSubmit={handleSignUpSubmit}>
            <Input
              isRequired
              label="아이디"
              placeholder="아이디를 입력하세요"
              type="text"
              name="userId"
              value={formSignupData.userId}
              onChange={handleInputChangeSignup}
            />
            {userIdError && <p style={{ color: 'red' }}>{userIdError}</p>}
            <Input
              isRequired
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              type="password"
              name="password"
              value={formSignupData.password}
              onChange={handleInputChangeSignup}
            />
            {passwordLengthError && <p style={{ color: 'red' }}>{passwordLengthError}</p>}
            <Input
              isRequired
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요"
              type="password"
              name="confirmPassword"
              value={formSignupData.confirmPassword}
              onChange={handleInputChangeSignup}
            />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            <p className="text-center text-small">
              이미 계정이 있으신가요?{' '}
              <StyledLink size="lg" onPress={() => setSelected('login')}>
                로그인
              </StyledLink>
            </p>

            <div className="flex gap-6 justify-end">
              <Button
                type="submit"
                fullWidth
                style={{
                  backgroundColor:
                    userIdError !== '' ||
                    passwordLengthError !== '' ||
                    passwordError !== '' ||
                    formSignupData.userId === '' ||
                    formSignupData.password === '' ||
                    formSignupData.confirmPassword === ''
                      ? '#D3D3D3'
                      : '#FFC4D0',
                  color:
                    userIdError !== '' ||
                    passwordLengthError !== '' ||
                    passwordError !== '' ||
                    formSignupData.userId === '' ||
                    formSignupData.password === '' ||
                    formSignupData.confirmPassword === ''
                      ? '#A9A9A9'
                      : '#000000', 
                }}
                disabled={
                  userIdError !== '' ||
                  passwordLengthError !== '' ||
                  passwordError !== '' ||
                  formSignupData.userId === '' ||
                  formSignupData.password === '' ||
                  formSignupData.confirmPassword === ''
                }
              >
                회원가입
              </Button>
            </div>
          </form>
        </Tab>
      </Tabs>
      {/* </CardBody>
      </Card> */}
    </div>
  );
}

export default LoginPage;
