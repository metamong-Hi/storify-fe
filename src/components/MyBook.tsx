'use client';
import React, { useEffect, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styled from 'styled-components';
import { Image,Modal } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import apiService from '../services/apiService';
import ImageEditorDrawer from './ImageEditorDrawer';
import ImageDroppable from './ImageDroppable';
const StyledFlipBook = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-radius: 20px;
  flex-direction: column;
  // .html-flip-book {
  //     width: 600px;
  //     height: 600px;
  //     box-shadow: 10px 10px 25px rgba(0.1, 0.1, 0.1, 0.3);
  // }

  .demoPage {
    // outline: 2px solid black;
    background-color: white;
    border-radius: 20px;
    // display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
interface PageIndexData {
  data: number;
}


let token: string | null;
if (typeof window !== 'undefined') {
  // token = localStorage.getItem('token');
  token=sessionStorage.getItem('token');
}
const MyBook: React.FC<MyBookProps> = ({ bookId }) => {
  const [page, setPage] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const bookRef = useRef<HTMLFlipBookElement>(null);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  
  const openImageEditor = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageEditorOpen(true);
  };

  const closeImageEditor = () => {
    setIsImageEditorOpen(false);
    setSelectedImageUrl('');
    setEditedImageUrl('');
  };
  const handleFlip = (pageIndex:PageIndexData) => {
    console.log(pageIndex + "pageIndex임");
    setCurrentPageIndex(pageIndex.data);
  };
  
  useEffect(() => {
    console.log(currentPageIndex + "페이지임");
  }, [currentPageIndex]);
  const handleImageDrop = (droppedImageUrl:string) => {
    
    const updatedPage = [...page]; 
     updatedPage[currentPageIndex] = droppedImageUrl; 
    setPage(updatedPage); 


  closeImageEditor();
  };

  interface HTMLFlipBookElement extends HTMLElement {
    pageFlip(): PageFlip;
  }

  interface PageFlip {
    flipNext(): void;
    flipPrev(): void;
  }
  const showDeleteAlert=()=>{
    Swal.fire({
        title:'삭제',
        text:'정말 삭제하실건가요?',
        icon:'question',
        confirmButtonText:'OK',
    }).then((result)=>{
        if(result.value){
            handleDelete();
        }
    })
  }
  const showDeleteFailedAlert=()=>{
    Swal.fire({
        title:'삭제실패',
        text:'본인 글만 삭제할 수 있어요',
        icon:'warning',
        confirmButtonText:'OK',
    }).then((result)=>{
        // if(result.value){
        //     handleDelete();
        // }
    })
  }
  const showDeleteSuccessAlert=()=>{
    Swal.fire({
        title:'삭제성공',
        text:'삭제했어요~~',
        icon:'success',
        confirmButtonText:'OK',
    }).then((result)=>{
        // if(result.value){
        //     handleDelete();
        // }
    })
  }
  const goToNextPage = () => {
    if (bookRef.current && bookRef.current.pageFlip) {
      const pageFlipInstance = bookRef.current.pageFlip();
      if (pageFlipInstance) {
        pageFlipInstance.flipNext();
      }
    }
  };
  const goToPreviousPage = () => {
    if (bookRef.current && bookRef.current.pageFlip) {
      const pageFlipInstance = bookRef.current.pageFlip();
      if (pageFlipInstance) {
        pageFlipInstance.flipPrev();
      }
    }
  };

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
      const response = await apiService(process.env.NEXT_PUBLIC_API_URL + `/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("요청보내고 여기로옴")
      if (response.ok) {
        console.log('삭제됨');
        showDeleteSuccessAlert();
        window.location.href='/allbooks';
      } else {
        showDeleteFailedAlert();

        console.error('삭제 실패', response);
      }
    } catch (error) {
        console.log(error);
        showDeleteFailedAlert();
      console.error('삭제 중 오류 발생', error);
    }
  };
  return (
    <>
       {isImageEditorOpen && (
        <ImageEditorDrawer isOpen={isImageEditorOpen} onClose={closeImageEditor} hellopage={parseInt(currentPageIndex.toString(), 10)} bookId={bookId} />
      )}


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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Button onClick={goToPreviousPage}>
          이전페이지
          {/* <Image src="/Images/buttons/redArrow.png" alt="이전 페이지" style={{ zIndex: 100, position: 'relative' }} /> */}
        </Button>
        <Button onClick={goToNextPage}>
          다음페이지
          {/* <Image src="Images/buttons/redArrow2.png" alt="다음 페이지" /> */}
        </Button>
      </div>
      <Button color="danger" onClick={showDeleteAlert} style={{height:'40px',width:'40px'}}>
                 삭제
        </Button>  

      {/* 페이지 편집 버튼 */}
      {/* {selectedImageUrl && ( */}
        <Button onClick={() => openImageEditor(selectedImageUrl)} style={{height:'40px',width:'40px'}}>편집</Button>
      {/* )} */}
      <StyledFlipBook>
        <HTMLFlipBook
          ref={bookRef}
          width={550} // 너비를 600으로 설정
          height={550} // 높이를 600으로 설정
          style={{ boxShadow: '20px 20px 35px rgba(0.1, 0.1, 0.1, 0.5)', borderRadius: '20px' }}
          startPage={0}
          drawShadow={false}
          flippingTime={10}
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
          maxWidth={550}
          minHeight={300}
          maxHeight={550}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          onChangeOrientation={() => {}}
          onChangeState={() => {}}
          className="hi"
        >
          {page.map((item, index) => {
            const isEvenPage = index % 2 === 0;

            return (
              <div
                className="demoPage"
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '600px', // 페이지 높이 설정
                  width: '600px', // 페이지 너비 설정
                }}
              >
               {isEvenPage ? (
                  <ImageDroppable onDrop={handleImageDrop}>
                    <Image
                      isZoomed
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
                      // draggable
                      // onDragStart={(e) => handleDragStart(e, item)}
                    />
                  </ImageDroppable>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center', // 세로 방향 가운데 정렬
                      textAlign: 'center',
                      padding: '20px',
                      height: '50vh', // 부모 div 높이를 100%로 설정
                    }}
                  >
                    <p
                      style={{
                        fontSize: '1.5rem',
                        lineHeight: '2.75rem',
                        margin: 'auto', // 모든 방향에서 자동 마진 적용
                        //   textAlign: 'center',
                        //   alignItems:'center'
                      }}
                    >
                      {item}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </HTMLFlipBook>
      </StyledFlipBook>
    </>
  );
};

export default MyBook;
