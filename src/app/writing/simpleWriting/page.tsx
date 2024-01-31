"use client"
import React, { useState, useRef } from 'react';
import SimpleWritingForm from '@/components/forms/writingForms/simpleWritingForm';
import Image from 'next/image';

const SimplePage: React.FC = () => {
  const [formText, setFormText] = useState('');
  return (
    <div className="h-[92vh] w-full flex flex-col items-center mt-10">
      <div>
        <SimpleWritingForm/>
      </div>
  </div>
  );
};

export default SimplePage;
