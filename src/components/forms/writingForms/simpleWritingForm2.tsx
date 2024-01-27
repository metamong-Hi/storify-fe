import React from 'react';
import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react';

const LoadingComponent: React.FC = () => {
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
};

export default LoadingComponent;
