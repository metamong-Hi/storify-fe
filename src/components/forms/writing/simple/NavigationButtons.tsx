import React from 'react';
import Link from 'next/link';

interface NavigationButtonsProps {
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ isListening, setIsListening }) => (
  <div className="flex justify-between items-center">
    <Link href={`/writing`} passHref>
      <button className="btn xl:btn-lg btn-outline font-bold border-2">뒤로 가기</button>
    </Link>
    <button
      onClick={() => setIsListening(prevState => !prevState)}
      className={`btn xl:btn-lg font-bold border-2 btn-error ${isListening ? '' : 'btn-outline'}`}
    >
      {isListening ? '마이크 끄기' : '마이크 켜기'}
    </button>
    <Link href={`/writing/simple/waiting`} passHref>
      <button className="btn btn-outline xl:btn-lg btn-success  font-bold border-2">동화책 만들기</button>
    </Link>
  </div>
);

export default NavigationButtons;
