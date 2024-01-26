'use client';
import React, { useState, useEffect } from 'react';
import MediumImageButton from '../../buttons/imageButtons/mediumImageButton';
import Link from 'next/link';
import { Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';
import Pencil from '../../objects/eraserAndPencil/pencil';
import Eraser from '../../objects/eraserAndPencil/eraser';

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
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.setItem('eventsText', accumulatedText + text);
  };
  return (
    <Card className="max-w-[50vw] max-h-full">
      <CardHeader className="flex justify-around">
        <p className="text-4xl">오늘 어떤 일이 있었는지 자세히 적어줘</p>
        <Image
          isZoomed
          alt="angel"
          radius="sm"
          src="/images/angels/description3.png"
          width="70%"
          height="70%"
          style={{ marginLeft: '15%' }}
        />
      </CardHeader>

      <CardBody>
        <Textarea
          placeholder="기억에 남았던 일을 적어줘"
          className=" w-full h-full"
          value={text}
          onChange={handleChange}
          variant="bordered"
          color="success"
          size="lg"
          minRows={5}
          style={{ fontSize: '1.5rem' }}
        />
      </CardBody>

      <CardFooter>
        <div className="flex flex-row justify-between items-center w-full">
          <Link href={destination} passHref>
            <Button color="success" variant="light">
              뒤로 가기
            </Button>
          </Link>

          <div className="flex flex-row text-center items-center text-middle">
            <Button color="success" variant="light" onClick={handleButtonClick}>
              다음으로
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default EventsWritingForm;
