import React from 'react';

interface TextAreaProps {
  text: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ text, handleChange }) => (
  <textarea
    placeholder="여러분의 의견을 적극 반영하겠습니다."
    className="textarea textarea-bordered textarea-lg text-base-content w-full"
    rows={6}
    value={text}
    onChange={handleChange}
  ></textarea>
);

export default TextArea;
