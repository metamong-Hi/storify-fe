import React, { useState } from 'react';

const TextareaForm: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에서 입력된 텍스트를 처리하거나 전송합니다.
    console.log(text); // 예시로 콘솔에 출력
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg bg-white">
      <div className="mb-4">
        <label htmlFor="textarea" className="block text-gray-700 text-sm font-bold mb-2">
          내용
        </label>
        <textarea
          id="textarea"
          name="textarea"
          className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
          placeholder="내용을 입력하세요."
          value={text}
          onChange={handleTextareaChange}
          rows={6}
        />
      </div>
      <div className="flex items-center justify-end">
        <button
          className="inline-flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          type="submit"
        >
          제출
          <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </form>
  );
};

export default TextareaForm;
