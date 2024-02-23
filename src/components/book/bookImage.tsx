"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// 타입스크립트 인터페이스 정의 (prop 타입을 명시)
interface BookImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  quality?: number;
}

const BookImage: React.FC<BookImageProps> = ({ src, alt, width, height, priority, className, quality }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    // src prop이 변경될 때 마다 imageSrc 상태 업데이트
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    // 기본 이미지로 교체
    setImageSrc('/static/defaultAvatar.png');
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      quality={quality}
      onError={handleError}
    />
  );
};

export default BookImage;
