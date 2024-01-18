"use client"
"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import BasicB // Adjust the path as necessary

const SomeComponent = () => {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <h1>Some Component</h1>
      <BasicButton onClick={handleButtonClick}>Click Me</BasicButton>
    </div>
  );
};

export default SomeComponent;
