"use client"
"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';
import BasicButton from '@/components/buttons/basicButton'; // Adjust the path as necessary
import BigButton from '@/components/buttons/bigButton';
import MediumImageButton from '@/components/buttons/middleImageButton';

const ParentComponent = () => {
  const handleClick = () => {
    console.log('Image button clicked!');
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <MediumImageButton
        onClick={handleClick}
        imageSrc="/path/to/image.jpg"  // Replace with your image path
        alt="Description of Image"
      />
    </div>
  );
};

export default ParentComponent;
