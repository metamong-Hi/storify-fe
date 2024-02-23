'use client';
import React, { useState } from 'react';
import { LoginData } from '@/types/auth';
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react';
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { kakaologin, login } from '@/store/userSlice';
import { signup } from '@/store/userSlice';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import Image from 'next/image';
import { setNotifications } from '@/store/notificationSlice';
const StyledLink = styled(Link)`
  color: '#FFC4D0';
  cursor: pointer;

  &:hover {
  }
`;
interface UpdateTitleProps {
  bookId: string;
}
const UpdateTitle: React.FC<UpdateTitleProps> = ({ bookId }) => {
  const [formData, setFormData] = useState({
    title: '',
  });

  const showTitleSuccessAlert = () => {
    Swal.fire({
      title: `제목수정 성공`,
      text: '제목수정 성공했어요!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  const showTitleFailedAlert = () => {
    Swal.fire({
      title: `제목 수정 실패`,
      text: '제목 수정 실패했어요!',
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

  const handleTitleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: formData.title }),
      });

      const data = await response.json();
      console.log('성공함', data);
    } catch (error) {
      console.error('망함', error);
    }
    window.location.reload();
  };

  return (
    <div className=" max-w-full w-[340px] h-[160px] gap-10">
      <form className="flex flex-col gap-6" onSubmit={handleTitleSubmit}>
        <Input
          isRequired
          label="제목 수정"
          placeholder="새로운 제목을 입력하세요"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <div className="flex gap-6 justify-end">
          <Button type="submit" fullWidth style={{ backgroundColor: '#FFC4D0' }}>
            확인
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTitle;
