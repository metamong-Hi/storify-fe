'use client';
import React, { useEffect, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styled from 'styled-components';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
const StyledFlipBook = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .html-flip-book {
    width: 600px;
    height: 600px;
    box-shadow: 10px 10px 25px rgba(0.1, 0.1, 0.1, 0.3);
  }

  .demoPage {
    outline: 1px solid black;
    background-color: white;
    border-radius: 20px;
  }

  // .demoPage {
  //     outline: none;
  //     font-family: 'Times New Roman', serif;
  //     background: #f8f8f8; /* Slightly off-white background for the pages */
  //     color: #5C4033; /* A warm, dark brown color for the text to give it a storybook feel */
  //     position: relative; /* For positioning the pseudo-elements */
  //   }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface PageItem {
  imageUrl: string;
  text: string;
}

interface MyBookProps {
  bookId: string;
}

let token: string | null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}
const MyBook: React.FC<MyBookProps> = ({ bookId }) => {
  const [page, setPage] = useState<string[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/api/books/${bookId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTitle(data.title);
        // const pagesArray = Object.values(data.body);
        // const newPages = pagesArray.flatMap(item => [item.imageUrl, item.text]);

        // setPage(newPages);
        const pagesArray = Object.values(data.body) as PageItem[];
        const newPages = pagesArray.flatMap((item): string[] => [item.imageUrl, item.text]);

        setPage(newPages);
      })
      .catch((error) => {
        console.error('Fetching error: ', error);
      });
    //  console.log(page)
  }, [bookId]); // 빈 종속성 배열 추가
  const handleDelete = async () => {
    try {
      console.log(token + '토큰이다');
      console.log(bookId + '북아이디다');
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('삭제됨');
      } else {
        console.error('삭제 실패', response);
      }
    } catch (error) {
      console.error('삭제 중 오류 발생', error);
    }
  };

  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <Button color="danger" onClick={handleDelete} style={{ height: '40px', width: '40px' }}>
          삭제
        </Button>
      </div>
      <p
        style={{
          fontSize: '1.875rem',
          lineHeight: '2.25rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '50px',
        }}
      >
        {title}
      </p>
      <StyledFlipBook>
        <HTMLFlipBook
          width={600} // 너비를 600으로 설정
          height={600} // 높이를 600으로 설정
          style={{ boxShadow: '20px 20px 35px rgba(0.1, 0.1, 0.1, 0.5)' }}
          startPage={0}
          drawShadow={false}
          flippingTime={4}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={4}
          showPageCorners={true}
          disableFlipByClick={false}
          size="fixed"
          minWidth={300}
          maxWidth={600}
          minHeight={300}
          maxHeight={600}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={() => {}}
          onChangeOrientation={() => {}}
          onChangeState={() => {}}
          className="hi"
        >
          {page.map((item, index) => {
            const isEvenPage = index % 2 === 0;

            return (
              <div className="demoPage" key={index}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px',
                  }}
                >
                  {isEvenPage ? (
                    <Image
                      width={600}
                      height={600}
                      src={item}
                      alt={`Page ${index + 1}`}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        borderRadius: '20px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        paddingLeft: '30px',
                        paddingRight: '30px',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'Gulim',
                          fontSize: '1.5rem',
                          lineHeight: '2.75rem',
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </HTMLFlipBook>
      </StyledFlipBook>
    </>
  );
};

export default MyBook;
