"use client";
import React from 'react';
import HTMLFlipBook from 'react-pageflip';
// import styles from '../styles/styles.css'; // 스타일 파일 경로
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

// Props 타입 정의
interface MyBookProps {
  bookId: string;
}


const MyBook: React.FC<MyBookProps> = ({ bookId }) => {
  return (
    <>
      <h5>My Post: {bookId}</h5><br/>
      <StyledFlipBook>
      <HTMLFlipBook width={600} height={600}   style={{ boxShadow: '40px 40px 45px rgba(0.1, 0.1, 0.1, 0.8)' }}>
          {/* 페이지 1 */}

          <div className="demoPage" >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding:'30px'}}>
          <img
                  src="/images/newjeans9.jpeg"
                  alt="Page 3"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              </div>
             
          </div>

          {/* 페이지 2 */}
          <div className="demoPage" >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding:'30px' }}>
       
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingLeft: '30px',paddingRight:'30px'}}>
              where the lyrics express strong attraction and daydreaming about someone special. The lines convey a sense of falling deeply for someone, asking for their affirmation and attention. The song reflects on the feeling of being incomplete without the presence of this person, indicating a deep emotional connection. The lyrics also play with the idea of wanting the other person's call and affirmation, highlighting a mix of anticipation and longing.
              </div>
          </div>

          {/* 페이지 3 */}
          <div className="demoPage" >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding:'30px' }}>
              <img
                  src="/images/newjeans11.jpeg"
                  alt="Page 3"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              </div>
              
          </div>

          {/* 페이지 4 */}
          <div className="demoPage"  >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding:'30px' }}>
             
              </div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingLeft: '30px',paddingRight:'30px'}}>
              where the lyrics express strong attraction and daydreaming about someone special. The lines convey a sense of falling deeply for someone, asking for their affirmation and attention. The song reflects on the feeling of being incomplete without the presence of this person, indicating a deep emotional connection. The lyrics also play with the idea of wanting the other person's call and affirmation, highlighting a mix of anticipation and longing.
              </div>
          </div>

          <div className="demoPage"  >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding:'30px' }}>
              <img
                  src="/images/newjeans5.jpeg"
                  alt="Page 5"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              </div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingLeft: '30px',paddingRight:'30px'}}>
              where the lyrics express strong attraction and daydreaming about someone special. The lines convey a sense of falling deeply for someone, asking for their affirmation and attention. The song reflects on the feeling of being incomplete without the presence of this person, indicating a deep emotional connection. The lyrics also play with the idea of wanting the other person's call and affirmation, highlighting a mix of anticipation and longing.
              </div>
          </div>

          <div className="demoPage"  >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',padding:'30px'  }}>
              <img
                  src="/images/newjeans6.jpeg"
                  alt="Page 6"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              </div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingLeft: '30px',paddingRight:'30px'}}>
              where the lyrics express strong attraction and daydreaming about someone special. The lines convey a sense of falling deeply for someone, asking for their affirmation and attention. The song reflects on the feeling of being incomplete without the presence of this person, indicating a deep emotional connection. The lyrics also play with the idea of wanting the other person's call and affirmation, highlighting a mix of anticipation and longing.
              </div>
          </div>
      </HTMLFlipBook>
      </StyledFlipBook>
    </>
  );
}


export default MyBook;
