"use client"
import React, { useState } from 'react';
import FeedBack from '@/components/forms/banner/Feedback';
const FeedBackPage: React.FC = () => {
  const [formText, setFormText] = useState('');
  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center mt-10">
      <div>
        <FeedBack text={formText} setText={setFormText} />
      </div>
    </div>
  );
};

export default FeedBackPage;
