'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Textarea, Button } from "@nextui-org/react";


interface imageFeedBackProps {
    destination: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}
const imageFeedBack: React.FC<imageFeedBackProps> = ({
    text,
    setText,
    destination,
}) => {

    const sampleImageUrl = "/images/pictures/sampleImage.png"; 
    const passImageUrl = "/images/buttons/pass.png"; 
    const nonPassImageUrl = "/images/buttons/nonPass.png"; 
    const sampleText = "지호는 아빠와 낚시터에 놀러 갔어요. 물고기가 헤험치는 모습이 무척 신기했어요."


    let token: string | null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    return (
        <Card className="max-w-[50vw] max-h-full">
            <CardHeader className="flex justify-around">
            <p className="text-2xl">다른 그림으로 바꾸길 원하면 그림을 클릭해줘</p>
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
                <Image src={nonPassImageUrl} width = "100px" height = "100px" alt="nonPass" />
                <Image src={passImageUrl} width = "100px" height = "100px" alt="Pass" />
                
            </div>
            </CardFooter>

        </Card>
    );
};
export default imageFeedBack;
