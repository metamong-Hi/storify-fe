'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFont } from '@/store/fontSlice';
import { RootState } from '@/store';

interface FontOption {
  label: string;
  classSuffix: string;
}

const fontOptions: FontOption[] = [
  { label: '기본', classSuffix: 'default' },
  { label: '타임즈', classSuffix: 'serif' },
  { label: '교보손글씨', classSuffix: 'KyoboHand' },
  { label: '굴림', classSuffix: 'Gulim' },
  { label: '나무굴림', classSuffix: 'NamuGulim' },
  { label: '모던굴림', classSuffix: 'ModernGulim' },
  { label: '양말', classSuffix: 'Socks' },
  { label: '어린이', classSuffix: 'Kids' },
  { label: '타임즈', classSuffix: 'serif' },
  { label: '가벼운글씨', classSuffix: 'LightWrite' },
  { label: '소월', classSuffix: 'Sowal' },
  { label: '보스', classSuffix: 'Boss' },
  { label: '해변', classSuffix: 'Beach' },
  { label: '수피명조', classSuffix: 'Soopilmyungjo' },
  { label: '반딧불', classSuffix: 'BanditbulR' },
  { label: '휴고딕', classSuffix: 'HyuGothic' },
  { label: '페인트', classSuffix: 'Paint' },
  { label: '봄', classSuffix: 'Spring' },
  { label: '아기', classSuffix: 'Baby' },
  { label: '나눔고딕', classSuffix: 'nanum-gothic-regular' },
  { label: '노토세리프', classSuffix: 'noto-serif-kr-regular' },
];

const FontSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedFontClass = useSelector((state: RootState) => state.font.selectedFontClass);

  const handleFontChange = (classSuffix: string) => {
    dispatch(setFont(`font-${classSuffix}`));
  };

  useEffect(() => {
    document.body.className = selectedFontClass;
    localStorage.setItem('selectedFontClass', selectedFontClass);
  }, [selectedFontClass]);

  return (
    <div className="bg-base-content rounded-lg shadow-md p-5">
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2`}
      >
        {fontOptions.map((option, index) => (
          <button
            key={index}
            className={`btn min-w-full h-10 ${selectedFontClass === `font-${option.classSuffix}` ? 'btn-active' : ''}`}
            onClick={() => handleFontChange(option.classSuffix)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontSelector;
