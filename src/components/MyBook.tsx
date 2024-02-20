'use client';
import React, { useEffect, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styled, { keyframes } from 'styled-components';
import { Image, Modal } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import apiService from '../services/apiService';
import ImageEditorDrawer from './ImageEditorDrawer';
import ImageDroppable from './ImageDroppable';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const StyledFlipBook = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-radius: 20px;
  overflow: hidden;
  flex-direction: column;
  // .html-flip-book {
  //     width: 600px;
  //     height: 600px;
  //     box-shadow: 10px 10px 25px rgba(0.1, 0.1, 0.1, 0.3);
  // }
  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
  }
  .demoPage {
    // outline: 2px solid black;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    // display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    @media (max-width: 768px) {
      height: 512px;
      width: 100%;
    }
  }

  // .demoPage {
  //     outline: none;
  //     font-family: 'Times New Roman', serif;
  //     background: #f8f8f8; /* Slightly off-white background for the pages */
  //     color: #5C4033; /* A warm, dark brown color for the text to give it a storybook feel */
  //     position: relative; /* For positioning the pseudo-elements */
  //   }
`;

const ResponsiveText = styled.p`
  font-size: 2.25rem;
  line-height: 3rem;

  @media (max-width: 512px) {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }
  @media (min-width: 512px) and (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    font-size: 1.75rem;
    line-height: 2.5rem;
  }

  @media (min-width: 1281px) and (max-width: 1536px) {
    font-size: 2rem;
    line-height: 2.75rem;
  }
`;

const generateAnimation = () => {
  const animations = [
    `
      @keyframes animation {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
    `,
    `
      @keyframes animation {
        0%, 100% { transform: translateX(0%) scale(1.4); }
        50% { transform: translateX(-20%) scale(1.4); }
  
      }
    `,
    `
      @keyframes animation {
        0%, 100% { transform: translateX(0%) scale(1.4); }
        50% { transform: translateX(20%) scale(1.4); }
  
      }
    `,
    `
      @keyframes animation {
        0%, 100% { transform: translateY(0%) scale(1.4); }
        50% { transform: translateY(-20%) scale(1.4); }
  

      }
    `,
    `
      @keyframes animation {
        0%, 100% { transform: translateY(0%) scale(1.4); }
        50% { transform: translateY(20%) scale(1.4); }
  
      }
    `,
  ];

  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[0];
};

const AnimatedImage = styled.img<{ animationCss: string }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  ${(props) => props.animationCss}
  animation: animation 20s ease-in-out infinite;
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
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

let token: string | null;
if (typeof window !== 'undefined') {
  token = sessionStorage.getItem('token');
}

const MyBook: React.FC<MyBookProps> = ({ bookId }) => {
  const [page, setPage] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const bookRef = useRef<HTMLFlipBookElement>(null);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [helloUserId, setHelloUserId] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationCss, setAnimationCss] = useState('');

  const [isUser, setIsUser] = useState<boolean>(false);
  const [userId, setUserId] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();
  const showEditFailedAlert = () => {
    Swal.fire({
      title: '편집 불가',
      text: '본인이 쓴 책만 편집할 수 있어요!',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  const openImageEditor = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageEditorOpen(true);
  };

  const closeImageEditor = () => {
    setIsImageEditorOpen(false);
    setSelectedImageUrl('');
    setEditedImageUrl('');
  };
  const handleFlip = (pageIndex: PageIndexData) => {
    setCurrentPageIndex(pageIndex.data);
  };

  useEffect(() => {

      closeImageEditor();
      setIsLoaded(true);
      setAnimationCss(generateAnimation());
      const token = sessionStorage.getItem('token');

  }, [currentPageIndex]);
  const handleImageDrop = async (droppedImageUrl: string) => {
    const updatedPage = [...page];
    updatedPage[currentPageIndex] = droppedImageUrl;
    setPage(updatedPage);
    setSelectedImageUrl(droppedImageUrl);
  };

  interface HTMLFlipBookElement extends HTMLElement {
    pageFlip(): PageFlip;
  }

  interface PageFlip {
    flipNext(): void;
    flipPrev(): void;
  }
  const showDeleteAlert = () => {
    Swal.fire({
      title: '삭제',
      text: '정말 삭제하실건가요?',
      icon: 'question',
      confirmButtonText: '네, 삭제할게요',
      showCancelButton: true,
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };
  const showDeleteFailedAlert = () => {
    Swal.fire({
      title: '삭제실패',
      text: '본인 글만 삭제할 수 있어요',
      icon: 'warning',
      confirmButtonText: 'OK',
    }).then((result) => {});
  };
  const showDeleteSuccessAlert = () => {
    Swal.fire({
      title: '삭제성공',
      text: '삭제했어요~~',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {});
  };
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

  const handleEdit = async (droppedImageUrl: string) => {
    const token = sessionStorage.getItem('token');

    try {
      const realPageNumber = (Number(currentPageIndex) + 2) / 2;
      const realImage = droppedImageUrl.replace('data:image/jpeg;base64,', '');
      if (!realImage) {
        Swal.fire({
          title: '이미지가 없습니다!',
          text: '수정을 위해서는 이미지가 필요합니다.',
          icon: 'warning',
          confirmButtonText: '확인',
        });
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/books/${bookId}/${realPageNumber}/new-images`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            base64: realImage,
          }),
        },
      );

      if (response.ok) {
        const result = await response.json();
        Swal.fire('수정완료!', '수정이 완료되었어요!', 'success');
      } else {
        Swal.fire('실패!', '편집에 실패했습니다.', 'error');
      }
    } catch (error) {
      Swal.fire('오류!', '처리 중 예상치 못한 오류가 발생했습니다.', 'error');
    }

    closeImageEditor();
  };

  const handleimsiEdit = () => {
    console.log('편집 버튼이 클릭되었습니다.');
    Swal.fire({
      title: '이미지를 저장하시나요?',
      text: '한 번 저장하면 되돌릴 수 없어요!',
      icon: 'question',
      confirmButtonText: '네, 저장할게요',
      showCancelButton: true,
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        handleEdit(selectedImageUrl);
      }
    });
  };
  const handleimsiDelete = () => {
    closeImageEditor();
  };
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setTitle(data.title);
        setUserId(data.userId._id);
        setAuthor(data.userId.nickname);
        const pagesArray = Object.values(data.body) as PageItem[];
        const newPages = pagesArray.flatMap((item): string[] => [item.imageUrl, item.text]);
        setPage(newPages);
        setHelloUserId(data.userId._id);
        if (token) {
          const decodedPayload = jwtDecode(token);
          if (decodedPayload.sub === data.userId._id) {
            setIsUser(true);
          } else {
          }
        } else {
        }
      } catch (error) {
        console.error('Fetching error: ', error);
      }
    };

    fetchBookData();
  }, [bookId, token]);
  const handleDelete = async () => {
    try {
      const response = await apiService(process.env.NEXT_PUBLIC_API_URL + `/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        showDeleteSuccessAlert();
        window.location.href = '/allbooks';
      } else {
        showDeleteFailedAlert();
      }
    } catch (error) {
      console.log(error);
      showDeleteFailedAlert();
    }
  };
  const navigateToAllBooks = () => {
    router.push('/allbooks');
  };

  return (
    <>
      <div>
        {isImageEditorOpen && (
          <ImageEditorDrawer
            isOpen={isImageEditorOpen}
            onClose={closeImageEditor}
            hellopage={parseInt(currentPageIndex.toString(), 10)}
            bookId={bookId}
            imageUrls={[]}
            handleDragOver={(e) => e.preventDefault()}
            handleDragStart={(e, imageUrl) => console.log(imageUrl)}
            onEdit={handleimsiEdit}
            onDelete={handleimsiDelete}
          />
        )}

        <p
          className="text-base-content"
          style={{
            fontSize: '3rem',
            lineHeight: '2.25rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '20px',
          }}
        >
          {title}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        {isUser && (
          <button
            onClick={() => openImageEditor(selectedImageUrl)}
            className=" btn btn-lg text-success text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl btn-ghost"
          >
            그림바꾸기
          </button>
        )}

        <div className="dropdown" style={{ marginLeft: isUser ? '0' : 'auto' }}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-lg text-base-content text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl btn-ghost"
          >
            {author}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-10 menu p-0 md:p-1 shadow bg-base-100 rounded-box w-28 md:w-32"
          >
            <li>
              <Link href={`/user/${userId}/bookshelf`}>
                <span className="text-base-content text-sm md:text-md lg:text-md xl:text-lg 2xl:text-lg">
                  책장 보러가기
                </span>
              </Link>
            </li>
            {isUser && (
              <li role="button" className="menu-item">
                <a
                  href="#"
                  onClick={showDeleteAlert}
                  className="text-base-content text-sm md:text-md lg:text-md xl:text-lg 2xl:text-lg"
                >
                  삭제하기
                </a>
              </li>
            )}
          </ul>
          </div>
        </div>
        {/* <Link href={`/user/${userId}/bookshelf`}>
   {author}
  </Link> */}
      <StyledFlipBook>
        <HTMLFlipBook
          ref={bookRef}
          width={512}
          height={512}
          style={{ boxShadow: '10px 10px 15px rgba(0.1, 0.1, 0.1, 0.5)', borderRadius: '20px' }}
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
          size="stretch"
          minWidth={256}
          maxWidth={512}
          minHeight={256}
          maxHeight={512}
          maxShadowOpacity={0.3}
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
                  height: '512px', // 페이지 높이 설정
                  width: '512px', // 페이지 너비 설정

                  overflow: 'hidden',
                }}
              >
                {isEvenPage ? (
                  <ImageDroppable onDrop={handleImageDrop}>
                    <AnimatedImage
                      // className={`image ${isLoaded ? 'animate' : ''}`}
                      animationCss={animationCss}
                      // isZoomed
                      width={512}
                      height={512}
                      src={item}
                      alt={`Page ${index + 1}`}
                    />
                  </ImageDroppable>
                ) : (
                  <div className="text-black flex items-center p-8 h-[40vh] sm:h-[45vh] lg:h-[50vh]">
                    <ResponsiveText>{item}</ResponsiveText>
                  </div>
                )}
              </div>
            );
          })}
        </HTMLFlipBook>
      </StyledFlipBook>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      {currentPageIndex > 0 ? (
          <Button size="lg" onClick={goToPreviousPage} style={{ marginRight: '10px' }}>
            이전 페이지
          </Button>
        ) : (
          <Button size="lg" onClick={navigateToAllBooks} style={{ marginRight: '10px' }}>
            뒤로가기
          </Button>
        )}

        {currentPageIndex < page.length / 2 - 1 ? (
          <Button size="lg" onClick={goToNextPage} style={{ marginLeft: '10px' }}>
            다음 페이지
          </Button>
        ) : (
          <Button size="lg" onClick={navigateToAllBooks} style={{ marginLeft: '10px' }}>
            책장으로 가기
          </Button>
        )}
      </div>
    </>
  );
};

export default MyBook;
