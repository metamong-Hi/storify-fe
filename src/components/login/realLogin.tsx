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
import { showSignupModal } from '../signup/SignupModal';
import styled from 'styled-components';

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
    .then((action) => {
   
      if (action.meta.requestStatus === 'fulfilled') {
        console.log('로그인 성공');
        // showLoginSuccessAlert();
        window.location.reload();
      } else {
        throw new Error('로그인 실패');
      }
    })
      .catch((error) => {
        console.error('로그인 실패: ', error);
        showLoginFailedAlert();
      });
    console.log('여기까지 왔다');
  };

  const [formSignupData, setFormSignupData] = useState({
    userId: '',
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
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          console.log('회원가입 성공');
          showSignupSuccessAlert();
        } else {
          throw new Error('회원가입 실패');
        }
      })
      .catch((error) => {
        console.log('회원가입 실패: ********* ', error);
        showSignupFailedAlert();
      });

    console.log('여기까지 옴');
  };
  const handleSelectionChange = (key: string | number) => {
    setSelected(String(key));
  };
  return (
    <div className=" max-w-full w-[340px] h-[360px] gap-10">
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
              <form className="flex flex-col gap-6" onSubmit={handleLoginSubmit}>
                <Input
                  isRequired
                  label="아이디"
                  placeholder="아이디를 입력하세요"
                  type="text"
                  name="userId"
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
              <form className="flex flex-col gap-6 h-[300px]" onSubmit={handleSignUpSubmit}>
                <Input
                  isRequired
                  label="아이디"
                  placeholder="아이디를 입력하세요"
                  type="text"
                  name="userId"
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
       
                <p className="text-center text-small">
                  이미 계정이 있으신가요?{' '}
                  <StyledLink size="lg" onPress={() => setSelected('login')}>
                    로그인
                  </StyledLink>
                </p>
                <div className="flex gap-6 justify-end">
                  <Button type="submit" fullWidth style={{ backgroundColor: '#FFC4D0' }}>
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
