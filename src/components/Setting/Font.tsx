import React, { useState, useEffect } from 'react';

interface FontOption {
  label: string;
  classSuffix: string;
}

const fontOptions: FontOption[][] = [
  [{ label: '기본', classSuffix: 'default' }],
  [
    { label: '교보손글씨', classSuffix: 'KyoboHand' },
    { label: '굴림', classSuffix: 'Gulim' },
    { label: '나무굴림', classSuffix: 'NamuGulim' },
    { label: '모던굴림', classSuffix: 'ModernGulim' },
    { label: '양말', classSuffix: 'Socks' },
  ],
  [
    { label: '아이들', classSuffix: 'Kids' },
    { label: 'Comic Sans MS', classSuffix: 'ComicSansMS' },
    { label: 'Nanum Gothic', classSuffix: 'nanum-gothic-regular' },
    { label: 'Noto Serif KR', classSuffix: 'noto-serif-kr-regular' },
    { label: 'Nanum Pen Script', classSuffix: 'nanum-pen-script-regular' },
  ],
  [
    { label: 'Hahmlet', classSuffix: 'hahmlet-regular' },
    { label: 'Roboto Mono', classSuffix: 'roboto-mono' },
    { label: 'Fira Code', classSuffix: 'fira-code-regular' },
    { label: 'Kalam', classSuffix: 'kalam-regular' },
    { label: 'Amatic SC', classSuffix: 'amatic-sc-regular' },
  ],
  [
    { label: 'Pangolin', classSuffix: 'pangolin-regular' },
  ],
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
    <div className="flex flex-col gap-y-2">
      {fontOptions.map((group, index) => (
        <div key={index} className="flex flex-wrap gap-2">
          {group.map((option, index) => (
            <button
              key={index}
              className={`btn min-w-[150px] ${selectedFontClass === `font-${option.classSuffix}` ? 'btn-active' : ''}`}
              onClick={() => handleFontChange(option.classSuffix)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FontSelector;
