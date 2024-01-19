"use client"
import React, { useState } from 'react';

const SimpleWritingForm: React.FC = () => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <form className="w-full max-w-lg">
      <label htmlFor="story" className="block text-lg font-bold mb-2">
        당신의 이야기를 적어보세요:
      </label>
      <textarea
        id="story"
        name="story"
        rows={10}
        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm p-2 leading-loose focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={text}
        onChange={handleChange}
        style={{
          backgroundSize: '100% 2em',
          backgroundImage: 'linear-gradient(to bottom, transparent 1.9em, #000 1.9em, #000 2em, transparent 2em)'
        }}
      />
    </form>
  );
};

export default SimpleWritingForm;
