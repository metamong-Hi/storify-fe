"use client"
import React, { useState } from 'react';
import SimpleCard from '@/components/objects/cards/simple';
import ComplexCard from '@/components/objects/cards/complex';

const Writing: React.FC = () => {

  return (
    
    <div className="h-[92vh] w-full bg-gray-200 flex flex-col items-center mt-10 ">
      <h1 className="text-4xl font-bold ]">AI요정이 생성해 주는 동화</h1>
      <div className="w-full h-full flex  flex-col sm :flex-col md:flex-row lg:flex-row justify-center ">
        <SimpleCard />
        <ComplexCard />
      </div>
    </div>
   
  );
};

export default Writing;

