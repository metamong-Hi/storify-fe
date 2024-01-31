"use client"
import React, { useState, useRef, useEffect } from 'react';
import SimpleWritingForm from '@/components/forms/writingForms/simple/simpleWritingForm';
import Image from 'next/image';

const SimplePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full  min-h-screen  bg-[#FAF3E0]">
      <div className="mt-5">
        <SimpleWritingForm />
      </div>
    </div>
  );
};

export default SimplePage;