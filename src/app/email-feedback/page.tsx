"use client"
import React, { useState, useRef } from 'react';
import EmailFeedBack from '@/components/forms/email-feedback';
const EmailFeedBackPage: React.FC = () => {
  const [formText, setFormText] = useState('');
  return (
    <div className="h-[92vh] w-full flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-4">이메일 피드백</h1>
      <div>
        <EmailFeedBack text={formText} setText={setFormText} />
      </div>
    </div>
  );
};

export default EmailFeedBackPage;
