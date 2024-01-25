// NextUICard.js 또는 NextUICard.tsx 파일 내부
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";

const NextUICard = () => {
  return (
    <Card className="max-w-full max-h-full">
      <CardHeader className="flex gap-3">
        <Image
          alt="angel"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">오늘 있었던 일들을 적어봐</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Textarea/>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NextUICard;
