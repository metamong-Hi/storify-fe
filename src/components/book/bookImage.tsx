'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BookImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  quality?: number;
}

const BookImage: React.FC<BookImageProps> = ({
  src,
  alt,
  width,
  height,
  priority,
  className,
  quality,
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
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
