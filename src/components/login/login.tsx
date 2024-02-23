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
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import LeftOverlayContent from './LeftOverlayContent';
import RightOverlayContent from './RightOverlayContent';

function LoginPage() {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const overlayBg = 'bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-800';

  // Rest of your component logic and JSX here
  return (
    <div className="h-4/5 w-4/5 bg-white relative overflow-hidden rounded-lg">
      <div
        id="signin"
        className={`bg-white absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20 ${
          isAnimated ? 'translate-x-full opacity-0' : ''
        }`}
      >
        <SigninForm />
      </div>

      <div
        id="signup"
        className={`absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out ${
          isAnimated ? 'translate-x-full opacity-100 z-50 animate-show' : 'opacity-0 z-10'
        }`}
      >
        <div className="h-full w-full flex justify-center items-center">
          <SignupForm />
        </div>
      </div>

      <div
        id="overlay-container"
        className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition transition-transform duration-700 ease-in-out z-100 ${
          isAnimated ? '-translate-x-full' : ''
        }`}
      >
        <div
          id="overlay"
          className={`${overlayBg} relative -left-full h-full w-[200%] transform transition transition-transform duration-700 ease-in-out ${
            isAnimated ? 'translate-x-1/2' : 'translate-x-0'
          }`}
        >
          <div
            id="overlay-left"
            className={`w-1/2 h-full absolute flex justify-center items-center top-0 transform -translate-x-[20%] transition transition-transform duration-700 ease-in-out ${
              isAnimated ? 'translate-x-0' : '-translate-x-[20%]'
            }`}
          >
            <LeftOverlayContent isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
          </div>
          <div
            id="overlay-right"
            className={`w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition transition-transform duration-700 ease-in-out ${
              isAnimated ? 'translate-x-[20%]' : 'translate-x-0'
            }`}
          >
            <RightOverlayContent isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
          </div>
        </div>
      </div>
    </div>
  );
  // const [selected, setSelected] = useState('login');

  // // const [formData, setFormData] = useState<LoginData>({ username: '', password: '' });
  // const dispatch = useAppDispatch();
  // const loginStatus = useAppSelector((state) => state.user.status);
  // const loginError = useAppSelector((state) => state.user.error);

  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  // });
  // const showLoginSuccessAlert = () => {
  //   Swal.fire({
  //     title: `로그인 성공`,
  //     text: '로그인에 성공했어요!',
  //     icon: 'success',
  //     confirmButtonText: 'OK',
  //   }).then((result) => {
  //     if (result.value) {
  //       window.location.reload();
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //     }
  //   });
  // };
  // const showLoginFailedAlert = () => {
  //   Swal.fire({
  //     title: `로그인 실패`,
  //     text: '로그인에 실패했어요!',
  //     icon: 'error',
  //     confirmButtonText: 'OK',
  //   }).then((result) => {
  //     if (result.value) {
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //     }
  //   });
  // };
  // const showSignupSuccessAlert = () => {
  //   Swal.fire({
  //     title: `회원가입 성공`,
  //     text: '회원가입에 성공했어요!',
  //     icon: 'success',
  //     confirmButtonText: 'OK',
  //   }).then((result) => {
  //     if (result.value) {
  //       window.location.reload();
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //     }
  //   });
  // };
  // const showSignupFailedAlert = () => {
  //   Swal.fire({
  //     title: `회원가입 실패`,
  //     text: '회원가입에 실패했어요!',
  //     icon: 'error',
  //     confirmButtonText: 'OK',
  //   }).then((result) => {
  //     if (result.value) {
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //     }
  //   });
  // };
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target;
  //   const name = target.name;
  //   const value = target.value;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(login({ username: formData.username, password: formData.password }))
  //     .then(() => {
  //       console.log('로그인 성공');
  //       showLoginSuccessAlert();
  //     })
  //     .catch((error) => {
  //       console.error('로그인 실패: ', error);
  //       showLoginFailedAlert();
  //     });
  //   console.log('여기까지 왔다');
  // };

  // const [formSignupData, setFormSignupData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });
  // const handleInputChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target;
  //   const name = target.name;
  //   const value = target.value;
  //   setFormSignupData({
  //     ...formSignupData,
  //     [name]: value,
  //   });
  // };

  // const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(
  //     signup({
  //       username: formSignupData.username,
  //       password: formSignupData.password,
  //       email: formSignupData.email,
  //     }),
  //   )
  //     .then(() => {
  //       showSignupSuccessAlert();
  //     })
  //     .catch((error) => {
  //       console.log('회원가입 실패: ********* ', error);
  //       showSignupFailedAlert();
  //     });

  //   console.log('여기까지 옴');
  // };
  // const handleSelectionChange = (key: string | number) => {
  //   setSelected(String(key));
  // };
  // return (
  //   <div className="flex flex-col w-full" style={{ fontFamily: 'ModernGulim' }}>
  //     <Card className="max-w-full w-[340px] h-[400px]">
  //       <CardBody className="overflow-hidden">
  //         <Tabs
  //           fullWidth
  //           size="md"
  //           aria-label="Tabs form"
  //           selectedKey={selected}
  //           onSelectionChange={handleSelectionChange}
  //         >
  //           <Tab key="login" title="로그인">
  //             <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
  //               <Input
  //                 isRequired
  //                 label="이름"
  //                 placeholder="이름을 입력하세요"
  //                 type="text"
  //                 name="username"
  //                 value={formData.username}
  //                 onChange={handleInputChange}
  //               />
  //               <Input
  //                 isRequired
  //                 label="비밀번호"
  //                 placeholder="비밀번호를 입력하세요"
  //                 type="password"
  //                 name="password"
  //                 value={formData.password}
  //                 onChange={handleInputChange}
  //               />
  //               <p className="text-center text-small">
  //                 계정이 없으신가요?{' '}
  //                 <Link
  //                   size="sm"
  //                   style={{ color: '#FFC4D0' }}
  //                   onPress={() => setSelected('sign-up')}
  //                 >
  //                   회원가입
  //                 </Link>
  //               </p>
  //               <div className="flex gap-2 justify-end">
  //                 <Button type="submit" fullWidth style={{ backgroundColor: '#FFC4D0' }}>
  //                   로그인
  //                 </Button>
  //               </div>
  //             </form>
  //           </Tab>
  //           <Tab key="sign-up" title="회원가입">
  //             <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSignUpSubmit}>
  //               <Input
  //                 isRequired
  //                 label="이름"
  //                 placeholder="이름을 입력하세요"
  //                 type="text"
  //                 name="username"
  //                 value={formSignupData.username}
  //                 onChange={handleInputChangeSignup}
  //               />
  //               <Input
  //                 isRequired
  //                 label="비밀번호"
  //                 placeholder="비밀번호를 입력하세요"
  //                 type="password"
  //                 name="password"
  //                 value={formSignupData.password}
  //                 onChange={handleInputChangeSignup}
  //               />
  //               <Input
  //                 isRequired
  //                 label="이메일"
  //                 placeholder="이메일을 입력하세요"
  //                 type="email"
  //                 name="email"
  //                 value={formSignupData.email}
  //                 onChange={handleInputChangeSignup}
  //               />
  //               <p className="text-center text-small">
  //                 이미 계정이 있으신가요?{' '}
  //                 <Link size="sm" style={{ color: '#FFC4D0' }} onPress={() => setSelected('login')}>
  //                   로그인
  //                 </Link>
  //               </p>
  //               <div className="flex gap-2 justify-end">
  //                 <Button type="submit" fullWidth style={{ backgroundColor: '#FFC4D0' }}>
  //                   회원가입
  //                 </Button>
  //               </div>
  //             </form>
  //           </Tab>
  //         </Tabs>
  //       </CardBody>
  //     </Card>
  //   </div>
  // );
}

export default LoginPage;
