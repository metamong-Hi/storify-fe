'use client';
import React, { useState, forwardRef } from 'react';
import MediumImageButton from '../../buttons/imageButtons/mediumImageButton';
import Link from 'next/link';
import { Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';
import Pencil from '../../objects/eraserAndPencil/pencil';
import Eraser from '../../objects/eraserAndPencil/eraser';

interface SimpleWritingFormProps {
  destination: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const SimpleWritingForm: React.FC<SimpleWritingFormProps> = ({ text, setText, destination }) => {
  let token: string | null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/stories/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });
      if (response.ok) {
        alert("제출 성공!");
        setTimeout(() => {
          window.location.href = destination;
        }, 2000);
      } else {
        alert('제출에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      console.error('Error submitting story:', error);
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  return (
    <Card className="max-w-[50vw] max-h-full">
      <CardHeader className="flex flex-row justify-center items-center ">
        <p className="text-4xl flex-grow text-center">오늘 있었던 일들을 적어봐</p>
      </CardHeader>
      <CardBody>
        <Textarea
          placeholder="자유롭게 적어줘"
          className=" custom-textarea w-full h-full"
          value={text}
          onChange={handleChange}
          variant="bordered"
          color="primary"
          size="lg"
          minRows={5}
          style={{ fontSize: '1.5rem' }}
        />
      </CardBody>
      <CardFooter>
        <div className="flex flex-row justify-between items-center w-full">
          <Link href={destination} passHref>
            <Button color="primary" variant="light">
              뒤로 가기
            </Button>
          </Link>

          <div className="flex flex-row text-center items-center text-middle">
            <Button color="primary" variant="light" onClick={handleButtonClick}>
              제출하기
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SimpleWritingForm;
