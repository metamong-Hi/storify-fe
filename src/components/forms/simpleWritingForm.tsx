import React, { useState } from 'react';

const SimpleWritingForm: React.FC = () => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/stories/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text }) 
      });
      if (response.ok) {

        console.log('Story submitted successfully');
      } else {

        console.error('Failed to submit story');
      }
    } catch (error) {

      console.error('Error submitting story:', error);
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
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
      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        제출하기
      </button>
    </form>
  );
};

export default SimpleWritingForm;
