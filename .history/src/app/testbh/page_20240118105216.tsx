"use client"
import React from 'react';
import BasicButt
import LargeButton from './components/LargeButton';
import ImageButton from './components/ImageButton';

const App = () => {
  const handleButtonClick = () => {
    console.log('버튼 클릭!');
  };

  return (
    <div className="App">
      <BasicButton onClick={handleButtonClick}>기본 버튼</BasicButton>
      <LargeButton onClick={handleButtonClick}>큰 버튼</LargeButton>
      <ImageButton onClick={handleButtonClick} imageSrc="/path/to/image.jpg" alt="이미지 버튼" />
    </div>
  );
};

export default App;
