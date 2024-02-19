'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/store/themeSlice';
import { RootState } from '@/store';

interface ThemeGroup {
  label: string;
  value: string;
}

const themeGroups: ThemeGroup[] = [
  { label: '기본', value: 'light' },
    { label: '밝음', value: 'light' },
    { label: '어두움', value: 'dark' },
    { label: '컵케이크', value: 'cupcake' },
    { label: '범블비', value: 'bumblebee' },
    { label: '에메랄드', value: 'emerald' },
    { label: '사무실', value: 'corporate' },
    { label: '신스웨이브', value: 'synthwave' },
    { label: '레트로', value: 'retro' },
    { label: '사이버펑크', value: 'cyberpunk' },
    { label: '발렌타인', value: 'valentine' },
    { label: '할로윈', value: 'halloween' },
    { label: '정원', value: 'garden' },
    { label: '숲', value: 'forest' },
    { label: '아쿠아', value: 'aqua' },
    { label: '로파이', value: 'lofi' },
    { label: '파스텔', value: 'pastel' },
    { label: '판타지', value: 'fantasy' },
    { label: '와이어프레임', value: 'wireframe' },
    { label: '검정색', value: 'black' },
    { label: '럭셔리', value: 'luxury' },
    { label: '드라큘라', value: 'dracula' },
    { label: '잉크', value: 'cmyk' },
    { label: '가을', value: 'autumn' },
    { label: '비즈니스', value: 'business' },
    { label: '신맛', value: 'acid' },
    { label: '레모네이드', value: 'lemonade' },
    { label: '밤', value: 'night' },
    { label: '커피', value: 'coffee' },
    { label: '겨울', value: 'winter' },
    { label: '흐림', value: 'dim' },
    { label: '바이킹', value: 'nord' },
    { label: '해질녘', value: 'sunset' },
];

const Theme: React.FC = () => {
  const selectedTheme = useSelector((state: RootState) => state.theme.value) as string;
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem('selectedTheme') || 'light';
    dispatch(setTheme(storedTheme));
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  const handleThemeChange = (themeValue:string) => {
    dispatch(setTheme(themeValue));
  };

  return (
    <div className="bg-base-content rounded-lg shadow-md p-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
        {themeGroups.map((theme, index) => (
          <div key={index}>
            <label className=" w-full">
              <input
                type="radio"
                name="theme-buttons"
                className="btn theme-controller join-item min-w-full h-10 "
                aria-label={theme.label}
                value={theme.value}
                checked={selectedTheme === theme.value}
                onChange={() => handleThemeChange(theme.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Theme;
