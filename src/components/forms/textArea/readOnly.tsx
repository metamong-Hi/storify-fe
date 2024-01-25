import React from "react";
import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      isReadOnly
      variant="bordered"
      labelPlacement="outside"
      placeholder="당신의 말을 적어주세요"
      defaultValue="이 폼은 읽기 전용입니다."
      className="max-w-xs"
    />
  );
}
