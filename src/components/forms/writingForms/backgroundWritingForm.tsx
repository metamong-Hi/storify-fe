'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';

interface BackgroundWritingFormProps {
  destination: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
const BackgroundWritingForm: React.FC<BackgroundWritingFormProps> = ({
  text,
  setText,
  destination,
}) => {
  const [accumulatedText, setAccumulatedText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
 
  const handleSubmit = async () => {

    // Retrieve text from localStorage
    const peopleText = localStorage.getItem('peopleText') || '';
    const eventsText = localStorage.getItem('eventsText') || '';

    // Combine texts
    const finalText = peopleText + eventsText + text;

    // Send the combined text to the API
    await sendPostRequest(finalText);
  };
  let token: string | null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }


  const sendPostRequest = async (finalText: string) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/stories/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: finalText }),
      });
      if (response.ok) {
        console.log('Story submitted successfully');
      } else {
        console.error('Failed to submit story');
      }
    } catch (error) {
      console.error('Error submitting story:', error);
    }
  };
  return (
    <Card className="max-w-[50vw] max-h-full">
      <CardHeader className="flex justify-around">
        <p className="text-4xl">언제, 어디에서 있었던 일인지 자세히 적어줘</p>
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
          placeholder="하루 중 언제, 그리고 어디에서"
          className=" w-full h-full"
          value={text}
          onChange={handleChange}
          variant="bordered"
          color="warning"
          size="lg"
          minRows={5}
          style={{ fontSize: '1.5rem' }}
        />
      </CardBody>

      <CardFooter>
        <div className="flex flex-row justify-between items-center w-full">
          <Link href={destination} passHref>
            <Button color="warning" variant="light">
              뒤로 가기
            </Button>
          </Link>

          <div className="flex flex-row text-center items-center text-middle">
            <Button color="warning" variant="light" onClick={handleSubmit}>
              제출하기
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default BackgroundWritingForm;
