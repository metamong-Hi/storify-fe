"use client"
import React, { useState, useRef } from 'react';
import EmailFeedBack from '@/components/forms/email-feedback';
const EmailFeedBackPage: React.FC = () => {
  const [formText, setFormText] = useState('');
  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center mt-10">
      <div>
        <EmailFeedBack text={formText} setText={setFormText} />
      </div>
    </div>
  );
};

export default EmailFeedBackPage;
