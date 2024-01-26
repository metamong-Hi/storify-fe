"use client"
import React, { useState } from 'react';
import SimpleCard from '@/components/objects/cards/simple';
import ComplexCard from '@/components/objects/cards/complex';

const Writing: React.FC = () => {

  return (
    
    <div className="h-[100vh] w-full  flex flex-col items-center p-1">
    <h1 className="text-6xl font-bold text-black">AI요정이 생성해 주는 동화</h1>
    <div className="w-full h-full flex flex-row justify-center items-center">
      <SimpleCard />
      <ComplexCard />
    </div>
    </div>
   
  );
};

export default Writing;

