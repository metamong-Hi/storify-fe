'use client';
import React, { useState, useEffect } from 'react';
import MediumImageButton from '../../buttons/imageButtons/mediumImageButton';
import Link from 'next/link';
import {Textarea} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import Pencil from '../../objects/eraserAndPencil/pencil';
import Eraser from '../../objects/eraserAndPencil/eraser';

interface EventsWritingFormProps {
    destination: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}
const EventsWritingForm: React.FC<EventsWritingFormProps> = ({
    text,
    setText,
    destination,
}) => {
    const [accumulatedText, setAccumulatedText] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendPostRequest(accumulatedText + text);
    };
    let token: string | null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    const handleButtonClick = () => {
        handleSubmit();
    };
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
            <form onSubmit={handleSubmit}>
            <CardHeader className="flex justify-around">
            
            <p className="text-2xl">오늘 어떤 일이 있었는지 자세히 적어줘</p>
            <Image
                alt="angel"
                radius="sm"
                src="/images/angels/description3.png"
                width="60%" 
                height="60%"
                style = {{marginLeft: '20%'}}
            />
            </CardHeader>

            <CardBody>
            <Textarea
                    label="기억에 남았던 일"
                    placeholder=""
                    className=" w-full h-full"
                    value={text}
                    onChange={handleChange}
                    variant = 'flat'
                    color = 'primary'
                    size ='lg'
                    minRows={5}
                style={{ fontSize: '1.75rem' }}
                />
            </CardBody>

            <CardFooter>
            <div className="flex flex-row justify-between mt-1 w-full">
                    <Link href={destination} passHref>
                        <MediumImageButton
                            onClick={handleButtonClick}
                            imageSrc="/images/buttons/redArrow.png"
                            alt="Submit"
                        />
                    </Link>
                
                <Link href={destination} passHref>
                    <MediumImageButton
                        onClick={handleButtonClick}
                        imageSrc="/images/buttons/redArrow2.png"
                        alt="Submit"
                    />
                </Link>
            </div>
            </CardFooter>
            </form>

        </Card>
    );
};
export default EventsWritingForm;
