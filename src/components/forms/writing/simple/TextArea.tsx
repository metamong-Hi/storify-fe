import React from 'react';

interface TextAreaProps {
  text: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ text, handleChange }) => (
  <textarea
    placeholder="여기에 이야기를 적어주세요"
    className="textarea textarea-bordered textarea-lg text-base-content text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl w-full"
    rows={6}
    value={text}
    onChange={handleChange}
  ></textarea>
);

export default TextArea;