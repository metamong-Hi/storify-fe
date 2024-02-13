"use client"
import React, { useState, useEffect } from 'react';

interface ThemeGroup {
  label: string;
  value: string;
}

const themeGroups: ThemeGroup[][] = [
  [
    { label: '기본', value: 'default' },
  ],
  [
    { label: '밝음', value: 'light' },
    { label: '어두움', value: 'dark' },
    { label: '컵케이크', value: 'cupcake' },
    { label: '범블비', value: 'bumblebee' },
    { label: '에메랄드', value: 'emerald' },
  ],
  [
    { label: '사무실', value: 'corporate' },
    { label: '신스웨이브', value: 'synthwave' },
    { label: '레트로', value: 'retro' },
    { label: '사이버펑크', value: 'sunset' },
    { label: '발렌타인', value: 'valentine' },
  ],
  [
    { label: '할로윈', value: 'halloween' },
    { label: '정원', value: 'garden' },
    { label: '숲', value: 'forest' },
    { label: '아쿠아', value: 'aqua' },
    { label: '로파이', value: 'lofi' },
  ],
  [
    { label: '파스텔', value: 'pastel' },
    { label: '판타지', value: 'fantasy' },
    { label: '와이어프레임', value: 'wireframe' },
    { label: '검정색', value: 'black' },
    { label: '럭셔리', value: 'luxury' },
  ],
  [
    { label: '드라큘라', value: 'dracula' },
    { label: '잉크', value: 'cmyk' },
    { label: '가을', value: 'autumn' },
    { label: '비즈니스', value: 'business' },
    { label: '신맛', value: 'acid' },
  ],
  [
    { label: '레모네이드', value: 'lemonade' },
    { label: '밤', value: 'night' },
    { label: '커피', value: 'coffee' },
    { label: '겨울', value: 'winter' },
    { label: '흐림', value: 'dim' },
  ],
  [
    { label: '바이킹', value: 'nord' },
    { label: '해질녘', value: 'sunset' },
  ],
];

const Theme: React.FC = () => {

  // 현재 선택된 테마를 저장하는 상태
  const [selectedTheme, setSelectedTheme] = useState<string>('default');

  // 선택된 테마가 변경될 때마다 <html> 태그의 data-theme 속성을 업데이트
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  // 테마 선택 핸들러 함수
  const handleThemeChange = (themeValue: string) => {
    setSelectedTheme(themeValue);
  };

  return (
    <div className="flex flex-col gap-y-1">
      {themeGroups.map((group, index) => (
        <div key={index} className="flex flex-wrap -mx-2"> 
          {group.map(theme => (
            <label key={theme.value} className="px-2 min-w-[120px]">
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller join-item w-full h-10 text-lg p-2" 
                aria-label={theme.label}
                value={theme.value}
                checked={selectedTheme === theme.value} 
                onChange={() => handleThemeChange(theme.value)}
              />
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Theme;
