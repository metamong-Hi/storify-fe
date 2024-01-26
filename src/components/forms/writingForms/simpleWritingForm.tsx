'use client';
import React, { useState, forwardRef } from 'react';
import MediumImageButton from '../../buttons/imageButtons/mediumImageButton';
import Link from 'next/link';
import {Textarea} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import Pencil from '../../objects/eraserAndPencil/pencil';
import Eraser from '../../objects/eraserAndPencil/eraser';
import  MyTextArea from "@/components/nextUICustom/myTextArea"

interface SimpleWritingFormProps {
    destination: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const SimpleWritingForm: React.FC<SimpleWritingFormProps> = ({
    text,
    setText,
    destination,
}) => {
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
                console.log('Story submitted successfully');
                console.log(response);
                alert(response);
            } else {
                console.error('Failed to submit story');
            }
        } catch (error) {
            console.error('Error submitting story:', error);
        }
    };

    const handleButtonClick = () => {
        handleSubmit();
    };

    return (
        <Card className="max-w-[50vw] max-h-full">
            <form onSubmit={handleSubmit}>
            <CardHeader className="flex flex-row justify-center items-center ">
                <Image
                    alt="angel"
                    radius="sm"
                    src="/images/angels/description2.png"
                    width="60%" 
                    height="60%"
                    style = {{marginLeft: '20%'}}
                />
                <p className="text-2xl flex-grow text-left ml-4">오늘 있었던 일들을 적어봐</p>
            </CardHeader>

            <CardBody >
                <Textarea
                label="오늘 한 일"
                placeholder=""
                className=" custom-textarea w-full h-full"
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
                            imageSrc="/Images/buttons/redArrow.png"
                            alt="Submit"
                        />
                    </Link>
                
                    <Link href={destination} passHref>
                        <MediumImageButton
                            onClick={handleButtonClick}
                            imageSrc="/Images/buttons/redArrow2.png"
                            alt="Submit"
                        />
                    </Link>
                </div>
            </CardFooter>
            </form>

        </Card>
        
    );
};

export default SimpleWritingForm;
