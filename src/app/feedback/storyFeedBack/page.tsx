'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Textarea, Button } from "@nextui-org/react";


interface storyFeedBackProps {
    destination: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}
const storyFeedBack: React.FC<storyFeedBackProps> = ({
    text,
    setText,
    destination,
}) => {

    const sampleImageUrl = "/images/pictures/sampleImage.png"; 
    const passImageUrl = "/images/buttons/pass.png"; 
    const refreshImageUrl = "/images/buttons/refresh.svg"; 
    const sampleText = "지호는 아빠와 낚시터에 놀러 갔어요. 물고기가 헤험치는 모습이 무척 신기했어요."


    let token: string | null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    return (
        <Card className="max-w-[50vw] max-h-full">
            <CardHeader className="flex justify-around">
            <p className="text-2xl">다른 스토리로 바꾸길 원하면 새로고침 버튼을 클릭해줘</p>
            <Image
                alt="angel"
                radius="sm"
                src="/images/angels/examine.png"
                width="60%" 
                height="60%"
                style = {{marginLeft: '20%'}}
            />
            </CardHeader>

            <CardBody className = "flex flex-row justify-around">
                <Image src={sampleImageUrl} width = "400px" height = "400px" alt="Pass" />
                <p>{sampleText}</p>
            </CardBody>

            <CardFooter>
            <div className="flex flex-row justify-between mt-1 w-full">
                <Image src={refreshImageUrl} width = "100px" height = "100px" alt="refresh" />
                <Image src={passImageUrl} width = "100px" height = "100px" alt="Pass" />
                
            </div>
            </CardFooter>

        </Card>
    );
};
export default storyFeedBack;
