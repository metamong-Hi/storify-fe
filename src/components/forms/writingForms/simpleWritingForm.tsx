'use client';
import React, { useState, useEffect, useRef } from 'react';
import MediumImageButton from '../../buttons/imageButtons/mediumImageButton';
import Link from 'next/link';
import { Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image,Spinner } from '@nextui-org/react';


interface SimpleWritingFormProps {
  destination: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const SimpleWritingForm: React.FC<SimpleWritingFormProps> = ({ text, setText, destination }) => {

  let token: string | null;
  const [isLoading, setIsLoading] = useState(false);
  const [responseContent, setResponseContent] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseContent(data.content);
        setIsLoading(false);

      } else {
        alert('제출에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      console.error('Error submitting story:', error);
    }
  };

  useEffect(() => {
    setDisplayedText(''); // responseContent가 변경될 때마다 displayedText를 초기화합니다.
    let i = 0;
    const typingEffect = (currentText: string) => {
      if (i < responseContent.length) {
        setDisplayedText(currentText + responseContent[i]);
        i++;
        setTimeout(() => typingEffect(currentText + responseContent[i - 1]), 50);
      }
    };
  
    if (responseContent) {
      typingEffect('');
    }
  }, [responseContent]);

  useEffect(() => {
    // 스크롤을 TextArea의 끝으로 이동시키는 로직
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [displayedText]); // displayedText가 변경될 때마다 스크롤을 조정합니다.

  const handleButtonClick = () => {
    handleSubmit();
  };

  if (isLoading) {
    return (
      <Card className="w-[70vw] bg-white max-h-full mt-10">
        <CardHeader className="flex flex-col justify-center items-center p-4">
          <p className="text-3xl flex-grow text-center">잠시만 기다려주세요</p>
          <p className="text-3xl flex-grow text-center">동화책을 만들고 있어요</p>
        </CardHeader>
        <CardBody className="flex justify-center items-center">
          <Spinner label="Loading..." color="primary" size="lg" />
        </CardBody>
      </Card>
    );

  }

  if (responseContent) {
    return (
      <Card className="w-[70vw] bg-white max-h-full mt-10">
        <CardHeader className="flex flex-col justify-center items-center p-4">
          <p className="text-3xl flex-grow text-center">오늘 있었던 일들을 적어봐</p>
          <p className="text-3xl flex-grow text-center">AI요정이 동화책으로 만들어줄게</p>
        </CardHeader>
        <CardBody>
        <Textarea
        ref={textAreaRef}
        isReadOnly
        label="Description"
        variant="bordered"
        labelPlacement="outside"
        placeholder="Enter your description"
        value={displayedText}
        size="lg"
          minRows={6}
          style={{ fontSize: '1.25rem', borderColor: '#EABF9F'}}
      />
        </CardBody>
        <CardFooter>
          <div className="flex flex-row justify-between items-center w-full">
            <Link href={destination} passHref>
              <Button color="primary" variant="light" onClick={handleButtonClick}>
                맘에 안들어 다시 만들래
              </Button>
            </Link>
  
            <div className="flex flex-row text-center items-center text-middle">
              <Button color="primary" variant="light" onClick={handleButtonClick}>
                동화책 보러 가기
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-[70vw] bg-white max-h-full mt-10">
      <CardHeader className="flex flex-col justify-center items-center p-4">
        <p className="text-3xl flex-grow text-center">오늘 있었던 일들을 적어봐</p>
        <p className="text-3xl flex-grow text-center">AI요정이 동화책으로 만들어줄게</p>
      </CardHeader>
      <CardBody>
        <Textarea
          placeholder="여기에 자유롭게 적어줘"
          className=" custom-textarea w-full h-full"
          value={text}
          onChange={handleChange}
          variant="bordered"
          color="primary"
          size="lg"
          minRows={6}
          style={{ fontSize: '1.25rem', borderColor: '#EABF9F'}}
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
