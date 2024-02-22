/**
 * 테마에 따른 아이콘 필터 스타일을 반환합니다.
 * @param theme 현재 적용된 테마
 * @returns CSS 필터 스타일
 */
export const getIconFilter = (theme: string): string => {
  const isWhiteIconTheme = [
    'luxury',
    'dark',
    'coffee',
    'night',
    'halloween',
    'sunset',
    'synthwave',
    'forest',
    'black',
    'dracula',
    'business',
  ].includes(theme);

  return isWhiteIconTheme ? 'invert(100%)' : 'none';
};
