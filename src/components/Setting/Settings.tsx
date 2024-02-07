import React, { useState, useEffect } from 'react';

const SettingsComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  // 배경음악 및 폰트 상태는 예시로만 제공합니다.
  const [music, setMusic] = useState('none');
  const [font, setFont] = useState('KyoboHand');

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    // 실제 테마 변경 로직 추가
  };

  const handleMusicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMusic(e.target.value);
    // 실제 배경음악 변경 로직 추가
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFont(e.target.value);
    // 실제 폰트 변경 로직 추가
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="p-2 rounded-full focus:outline-none focus:ring">
        {/* 톱니바퀴 아이콘 대체 (실제 프로젝트에 맞는 아이콘 사용) */}
        ⚙️
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl">
          <div className="px-4 py-2">
            <label>Theme:</label>
            <select value={theme} onChange={handleThemeChange} className="w-full">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              {/* 추가 테마 옵션 */}
            </select>
          </div>
          <div className="px-4 py-2">
            <label>Music:</label>
            <select value={music} onChange={handleMusicChange} className="w-full">
              <option value="none">None</option>
              {/* 배경음악 옵션 */}
            </select>
          </div>
          <div className="px-4 py-2">
            <label>Font:</label>
            <select value={font} onChange={handleFontChange} className="w-full">
              <option value="KyoboHand">KyoboHand</option>
              {/* 폰트 옵션 */}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsComponent;
