"use client"
"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import BasicButton from '@/components/buttons/basicButton'; // Adjust the path as necessary
import BigButton from '@/components/buttons/bigButton';

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
