'use client';
import React, { useState } from 'react';
import SimpleWritingForm from '@/components/forms/writing/simple/simpleWritingForm';
import SimpleCard from '@/components/objects/cards/simple';
import ComplexCard from '@/components/objects/cards/complex';
import ComplexWritingForm from '@/components/forms/writing/complex/complexWritingForm';
import Drawer from '@/components/drawer/friend';
import FriendPage from '@/components/drawer/friendPage';

const TestBH: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center text-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Textarea 입력 폼</h1>
      </div>
    </div>
  );
};

export default TestBH;
