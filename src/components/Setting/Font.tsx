import React, { useState, useEffect } from 'react';

interface FontOption {
  label: string;
  classSuffix: string; // 폰트를 지정하는 클래스의 접미사
}

const fontOptions: FontOption[] = [
  { label: '기본', classSuffix: 'default' },
  { label: '교보손글씨', classSuffix: 'KyoboHand' },
  { label: '굴림', classSuffix: 'Gulim' },
  { label: '나무굴림', classSuffix: 'NamuGulim' },
  { label: '모던굴림', classSuffix: 'ModernGulim' },
  { label: '양말', classSuffix: 'Socks' },
  { label: '아이들', classSuffix: 'Kids' },
];

const FontSelector: React.FC = () => {
  const [selectedFontClass, setSelectedFontClass] = useState<string>('font-default');

  useEffect(() => {
    document.body.className = selectedFontClass;
  }, [selectedFontClass]);

  const handleFontChange = (classSuffix: string) => {
    setSelectedFontClass(`font-${classSuffix}`);
  };

  return (
    <div className="flex flex-col gap-y-1">
      {fontOptions.map((option, index) => (
        <label key={index} className="flex items-center gap-2">
          <input
            type="radio"
            name="font-options"
            className="font-selector"
            value={option.classSuffix}
            checked={selectedFontClass === `font-${option.classSuffix}`}
            onChange={() => handleFontChange(option.classSuffix)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default FontSelector;
