import React from 'react';
import SimpleCard from '@/components/objects/cards/Simple';
import ComplexCard from '@/components/objects/cards/Complex';

const WritingPage: React.FC = () => {
  return (
    <>
      <SimpleCard />
      <ComplexCard />
    </>
  );
};

export default WritingPage;
