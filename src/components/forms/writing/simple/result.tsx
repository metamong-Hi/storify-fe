// ResultPage.tsx
import React from 'react';
import Image from 'next/image';

interface ResultPageProps {
  responseContent: string;
  imageUrls: string[];
  bookId: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ responseContent, imageUrls, bookId }) => (
  <div className="w-[60vw]">
    <h1 className="text-2xl font-bold mb-4">요정이 동화책을 만들고 있어요.</h1>
    <h2 className="text-2xl font-bold mb-4">잠시만 기다려 주세요.</h2>
    <div className="divider"></div>
    <textarea
      placeholder="여기에 간단히 적어줘"
      className="textarea textarea-bordered textarea-success textarea-lg w-full"
      rows={6}
      ref={textAreaRef}
      value={displayedText}
      readOnly
    ></textarea>
    <div className="divider"></div>
    <div className="flex justify-around gap-2">
      {realImagesLoaded ? (
        imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            width={256}
            height={256}
            className="rounded-md blur-effect1"
          />
        ))
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
    </div>
    {showNavigateButton && (
      <Link href={`/book/${bookData?._id}`} passHref>
        <button className="btn btn-outline btn-success btn-xm sm:btn-sm md:btn-md lg:btn-lg mt-4">
          책 보러 가기
        </button>
      </Link>
    )}
  </div>
);

export default ResultPage;
