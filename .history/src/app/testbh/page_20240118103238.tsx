// pages/index.tsx or any other component
import React, { useState, FC } from 'react';
import Form from '@/components/forms/signupForm';

const HomePage: FC = () => {

  return (
    <div className="p-4">
        <Form/>
    </div>
  );
};

export default HomePage;
