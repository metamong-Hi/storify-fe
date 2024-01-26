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
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.setItem('peopleText', accumulatedText + text);
  };

  return (
    <Card className="max-w-[50vw] max-h-full">
      <CardHeader className="flex justify-around">
        <p className="text-4xl">등장하는 인물(사람, 동물)을 자세히 적어줘</p>
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
          placeholder="주인공, 조연1, 조연2, 조연3"
          className=" w-full h-full"
          value={text}
          onChange={handleChange}
          variant="bordered"
          color="secondary"
          size="lg"
          minRows={5}
          style={{ fontSize: '1.5rem' }}
        />
      </CardBody>

      <CardFooter>
        <div className="flex flex-row justify-between items-center w-full">
          <Link href={destination} passHref>
            <Button color="secondary" variant="light">
              뒤로 가기
            </Button>
          </Link>

          <div className="flex flex-row text-center items-center text-middle">
            <Link href={destination} passHref>
              <Button color="secondary" variant="light" onClick={handleButtonClick}>
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
