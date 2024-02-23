'use client';
import React, { useRef } from 'react';
import Image from 'next/image';

const Skeleton = () => {
  return (
    <div className="skeleton w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 2xl:w-60 2xl:h-60  "></div>
  );
};

interface ImageGalleryProps {
  imageUrls: string[];
  realImagesLoaded: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls, realImagesLoaded }) => {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  return (
    <div className="flex justify-around gap-2">
      {realImagesLoaded
        ? imageUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Image ${index + 1}`}
              width={256}
              height={256}
              className="rounded-md blur-effect1 w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 2xl:w-60"
              ref={(el) => (imageRefs.current[index] = el)}
            />
          ))
        : Array.from({ length: imageUrls.length || 4 }, (_, index) => <Skeleton key={index} />)}
    </div>
  );
};

export default ImageGallery;
