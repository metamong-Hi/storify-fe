'use client';
import React from 'react';
import SimpleCard from '@/components/objects/cards/Simple';
import ComplexCard from '@/components/objects/cards/Complex';

const WritingPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <SimpleCard />
      <ComplexCard />
    </div>
  );
};

export default WritingPage;
