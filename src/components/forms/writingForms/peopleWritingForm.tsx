'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter, Image, Textarea, Button,} from '@nextui-org/react';

interface PeopleWritingFormProps {
  destination: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
const PeopleWritingForm: React.FC<PeopleWritingFormProps> = ({ text, setText, destination }) => {
  const [accumulatedText, setAccumulatedText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleButtonClick = () => {
    localStorage.setItem('peopleText', accumulatedText + text);
  };


  return (
    <Card className="w-[70vw] max-h-full mt-10">
      <CardHeader className="flex flex-col justify-center items-center p-4">
        <p className="text-3xl">이야기에 등장하는 사람과 동물을</p>
        <p className="text-3xl">자세히 적어줘</p>
      </CardHeader>
      <CardBody>
        <Textarea
          placeholder="너의 이름과 동화에 등장할 사람들을 소개해줘"
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
          <Link href='/writing' passHref>
            <Button color="primary" variant="light" style = {{fontSize: '1.25rem'}}>
              뒤로 가기
            </Button>
          </Link>

          <div className="flex flex-row text-center items-center text-middle">
            <Link href={destination} passHref>
              <Button color="primary" variant="light" onClick={handleButtonClick} style = {{fontSize: '1.25rem'}}>
                다음으로
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default PeopleWritingForm;
