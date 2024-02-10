'use client';
import React, { useEffect, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styled,{ keyframes} from 'styled-components';
import { Image,Modal } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import apiService from '../services/apiService';
import ImageEditorDrawer from './ImageEditorDrawer';
import ImageDroppable from './ImageDroppable';
import { jwtDecode } from 'jwt-decode';
const StyledFlipBook = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-radius: 20px;
  overflow:hidden;
  flex-direction: column;
  // .html-flip-book {
  //     width: 600px;
  //     height: 600px;
  //     box-shadow: 10px 10px 25px rgba(0.1, 0.1, 0.1, 0.3);
  // }
  @media (max-width: 768px) {
    height: auto; 
    padding: 20px; 
  }
  .demoPage {
    // outline: 2px solid black;
    background-color: white;
    border-radius: 20px;
    overflow:hidden;
    // display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    @media (max-width: 768px) {
      height: 400px;
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
  font-size: 1.5rem; 
  line-height: 2.75rem; 
  margin: auto; 
  @media (max-width: 768px) {
    font-size: 1.0rem; 
    line-height: 2rem; 
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
    `
  ];

  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[0];
};


const AnimatedImage = styled.img<{ animationCss: string }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  ${props => props.animationCss}
  animation: animation 8s ease-in-out infinite;
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
  const [helloUserId, setHelloUserId]=useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationCss, setAnimationCss] = useState('');
  const token = sessionStorage.getItem('token');
  const [isUser, setIsUser] = useState<boolean>(false);

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
  const handleFlip = (pageIndex:PageIndexData) => {
    console.log(pageIndex + "pageIndex임");
    setCurrentPageIndex(pageIndex.data);
  };


  useEffect(() => {
    console.log(currentPageIndex + "페이지임");
      closeImageEditor();
      setIsLoaded(true);
      setAnimationCss(generateAnimation());
  }, [currentPageIndex]);
  const handleImageDrop = async(droppedImageUrl:string) => {
    
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
      showCancelButton: true, // 닫기 버튼을 표시합니다.
      cancelButtonText: '취소', // 닫기 버튼의 텍스트를 설정합니다.
    }).then((result) => {
      if (result.isConfirmed) { // 'result.value' 대신 'result.isConfirmed'를 사용합니다.
        handleDelete();
      }
    });
  }
  const showDeleteFailedAlert=()=>{
    Swal.fire({
        title:'삭제실패',
        text:'본인 글만 삭제할 수 있어요',
        icon:'warning',
        confirmButtonText:'OK',
    }).then((result)=>{

    })
  }
  const showDeleteSuccessAlert=()=>{
    Swal.fire({
        title:'삭제성공',
        text:'삭제했어요~~',
        icon:'success',
        confirmButtonText:'OK',
    }).then((result)=>{

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

  const handleEdit= async(droppedImageUrl:string) => {

    const token=sessionStorage.getItem('token')
    try {
      const realPageNumber=(Number(currentPageIndex)+2)/2;
      const realImage = droppedImageUrl.replace("data:image/jpeg;base64,", "");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/books/${bookId}/${realPageNumber}/new-images`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',

          'Authorization':`Bearer ${token}`,
        },
        body: JSON.stringify({
          base64: realImage
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // onDrop(`data:image/jpeg;base64,${droppedImageUrl}`); 
      } else {
      }
    } catch (error) {
    }

  closeImageEditor();
  }
  const handleimsiEdit = () => {
    console.log("편집 버튼이 클릭되었습니다.");
    Swal.fire({
      title: '이미지를 저장하시나요?',
      text: '한 번 저장하면 되돌릴 수 없어요!',
      icon: 'question',
      confirmButtonText: '네, 저장할게요',
      showCancelButton: true, // 닫기 버튼을 추가합니다.
      cancelButtonText: '취소', // 닫기 버튼의 텍스트를 설정합니다.
    }).then((result) => {
      if (result.isConfirmed) { // 확인 버튼이 클릭되었는지 확인합니다.
        handleEdit(selectedImageUrl);
        Swal.fire({
          title: '수정완료!',
          text: '수정이 완료되었어요!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
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
      const pagesArray = Object.values(data.body) as PageItem[];
      const newPages = pagesArray.flatMap((item): string[] => [item.imageUrl, item.text]);
      setPage(newPages);
      setHelloUserId(data.userId);
      if (token) {
        const decodedPayload = jwtDecode(token);
        if(decodedPayload.sub === data.userId) {
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
}, [bookId]); 
  const handleDelete = async () => {
    try {
      console.log(token + '토큰이다');
      console.log(bookId + '북아이디다');
      const response = await apiService(process.env.NEXT_PUBLIC_API_URL + `/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        showDeleteSuccessAlert();
        window.location.href='/allbooks';
      } else {
        showDeleteFailedAlert();
      }
    } catch (error) {
        console.log(error);
        showDeleteFailedAlert();
    }
  };
  console.log(helloUserId);
  return (
    <>
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
        style={{
          fontSize: '3rem',
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
          ref={bookRef}
          width={550} 
          height={550}
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
          size="stretch"
          minWidth={200}
          maxWidth={550}
          minHeight={300}
          maxHeight={550}
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
                  height: '600px', // 페이지 높이 설정
                  width: '600px', // 페이지 너비 설정
                  
                  overflow:'hidden'
                }}
              >
               {isEvenPage ? (
                  <ImageDroppable onDrop={handleImageDrop}>
                    <AnimatedImage
                          // className={`image ${isLoaded ? 'animate' : ''}`}
                      animationCss={animationCss}
                      // isZoomed
                      width={600}
                      height={600}
                      src={item}
                      alt={`Page ${index + 1}`}
                    
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
                    <ResponsiveText>
                    <p
               
                    >
                      {item}
                    </p>
                    </ResponsiveText>
                  </div>
                )}
              </div>
            );
          })}
        </HTMLFlipBook>
      </StyledFlipBook>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button onClick={goToPreviousPage}style={{ marginRight: '10px' }}>
          이전페이지
        
        </Button>
        <Button onClick={goToNextPage}style={{ marginLeft: '10px' }}>
          다음페이지 
       
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent:  'center', marginTop: '10px', gap: '10px', marginRight:'20px', marginBottom:'20px'}}>
  
  
      {isUser && (
<Button onClick={() => openImageEditor(selectedImageUrl)} style={{height:'40px',width:'40px', backgroundColor:'transparent', color:'blue'}}>그림바꾸기</Button>
)} 
  {isUser && (
<Button  onClick={showDeleteAlert} style={{height:'40px',width:'40px', backgroundColor:'transparent',color:'red'}}>
  삭제
</Button>  
)}


  </div>
   
    </>
  );
};

export default MyBook;
