'use client';
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';

interface EventsWritingFormProps {
  destination: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
const EventsWritingForm: React.FC<EventsWritingFormProps> = ({ text, setText, destination }) => {
  const [accumulatedText, setAccumulatedText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleButtonClick = () => {
    localStorage.setItem('eventsText', accumulatedText + text);
  };

  return (
    <Card className="w-[70vw] max-h-full mt-10">
      <CardHeader className="flex flex-col justify-center items-center p-4">
        <p className="text-3xl text-[#1E212D]">그 사람 또는 동물들과 어떤 일이 있었는지</p>
        <p className="text-3xl text-[#1E212D]">자세히 적어줘</p>
      </CardHeader>

      <CardBody>
        <Textarea
          placeholder="기억에 남았던 일을 적어줘"
          className=" w-full h-full"
          value={text}
          onChange={handleChange}
          variant="bordered"
          color="primary"
          size="lg"
          minRows={6}
          style={{ fontSize: '1.25rem' }}
        />
      </CardBody>

      <CardFooter>
        <div className="flex flex-row justify-between items-center w-full">
          <Link href='/writing/complexWriting/people' passHref>
            <Button variant="light" style = {{fontSize: '1.25rem'}} className = "text-[#1E212D]">
              뒤로 가기
            </Button>
          </Link>
          <div className="flex flex-row text-center items-center text-middle">
            <Link href={destination} passHref>
              <Button variant="light" onClick={handleButtonClick} style = {{fontSize: '1.25rem'}} className = "text-[#1E212D]">
                다음으로
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default EventsWritingForm;
