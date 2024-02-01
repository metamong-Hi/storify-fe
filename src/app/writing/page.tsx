"use client"
import React, { useState } from 'react';
import SimpleCard from '@/components/objects/cards/simple';
import ComplexCard from '@/components/objects/cards/complex';

const Writing: React.FC = () => {

  return (
    <>
      <SimpleCard />
      <ComplexCard />
    </>
  );
};

export default Writing;

