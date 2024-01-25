import React from "react";
import {Textarea} from "@nextui-org/react";

export default function App() {
  return (
    <Textarea
      label="글을 적어주세요"
      placeholder="글을 적어주세요"
      className="max-w-xs"
    />
  );
}
