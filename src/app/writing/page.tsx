"use client"
import React, { useState } from 'react';
import SimpleCard from '@/components/objects/cards/simple';
import ComplexCard from '@/components/objects/cards/complex';

const Writing: React.FC = () => {

  return (
    
    <div className="h-[95vh] w-full  flex flex-col items-center p-10 bg-[#FAF3E0]/80">
      <h1 className="text-4xl font-bold text-[#1E212D]">AI요정이 생성해 주는 동화</h1>
      <div className="w-full h-full flex  flex-col sm :flex-col md:flex-row lg:flex-row justify-center ">
        <SimpleCard />
        <ComplexCard />
      </div>
    </div>
   
  );
};

export default Writing;

