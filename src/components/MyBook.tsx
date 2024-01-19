"use client";
import React, { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styled from 'styled-components';

const StyledFlipBook = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .html-flip-book {
    width: 600px;
    height: 800px;
    box-shadow: 40px 40px 45px rgba(0.1, 0.1, 0.1, 0.8);

  }

  .demoPage {
    outline: 3px solid black;
    // border-radius: 20px;
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


interface MyBookProps {
  bookId: string;
}


const MyBook: React.FC<MyBookProps> = ({ bookId }) => {
  const [page,setPage]=useState([]);
  const [title,setTitle]=useState("");
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL+`/api/books/${bookId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setTitle(data.title)
        const pagesArray = Object.values(data.body);
        const newPages = pagesArray.flatMap(item => [item.imageUrl, item.text]);

        setPage(newPages);
       
      })
      .catch(error => {
        console.error("Fetching error: ", error);
      });
      //  console.log(page)
  }, []); // 빈 종속성 배열 추가
  
  console.log(page)
  return (
    <>
       <h5 style={{ textAlign: 'center', paddingTop: '20px' }}>{title}</h5><br/>
      <StyledFlipBook>
      <HTMLFlipBook width={600} height={600} style={{ boxShadow: '40px 40px 45px rgba(0.1, 0.1, 0.1, 0.8)' }}>
      {page.map((item, index) => {
        const isEvenPage = index % 2 === 0;

        return (
          <div className="demoPage" key={index}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
              {isEvenPage ? (
                <img
                  src={item}
                  alt={`Page ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '30px', paddingRight: '30px' }}>
                  {item}
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
}


export default MyBook;
