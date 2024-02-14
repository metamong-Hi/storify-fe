// ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  selectedFontClass: string;
  setSelectedFontClass: (fontClass: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('default');
  const [selectedFontClass, setSelectedFontClass] = useState<string>('font-default');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  useEffect(() => {
    const storedTheme = localStorage.getItem('selectedTheme') || 'default';
    setSelectedTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);

    // 글꼴 설정을 로컬 스토리지에서 불러옵니다.
    const storedFontClass = localStorage.getItem('selectedFontClass') || 'font-default';
    setSelectedFontClass(storedFontClass);
    document.documentElement.className = storedFontClass;
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    // 글꼴 클래스를 로컬 스토리지에 저장합니다.
    localStorage.setItem('selectedFontClass', selectedFontClass);
    document.documentElement.className = selectedFontClass;
  }, [selectedFontClass]);

  // 현재 재생중인 곡의 인덱스를 로컬 스토리지에서 불러오기
  useEffect(() => {
    const storedTrackIndex = localStorage.getItem('currentTrackIndex');
    if (storedTrackIndex) {
      setCurrentTrackIndex(parseInt(storedTrackIndex, 10));
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ selectedTheme, setSelectedTheme, selectedFontClass, setSelectedFontClass }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
