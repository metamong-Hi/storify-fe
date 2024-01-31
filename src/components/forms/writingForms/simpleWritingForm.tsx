'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay} from 'swiper/modules';


interface BookData {
  _id: string;
}

interface StoryImage {
  imageUrl : String;
}

const SimpleWritingForm = () => {

  const placeholderImages = [
    '/path/to/placeholder/image1.jpg', // Replace with your placeholder image URL
    '/path/to/placeholder/image2.jpg',
    '/path/to/placeholder/image3.jpg',
  ];

  let token: string | null;
  const [isLoading, setIsLoading] = useState(false);
  const [responseContent, setResponseContent] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>(placeholderImages);
  const [realImagesLoaded, setRealImagesLoaded] = useState(false);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [isImageBlurCompleted, setIsImageBlurCompleted] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [text,setText] = useState("");
  const [showNavigateButton, setShowNavigateButton] = useState(false);


  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setText('');
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseContent(data.content);
        setIsLoading(false);
        const bookResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageStyle : "cartoon",
            aiStory: data.content,
            storyId: data.story._id,
          }),
        });

        if (bookResponse.ok) {
          const responseData = await bookResponse.json();
          setBookData(responseData);
          setImageUrls([
            responseData.body["1"].imageUrl,
            responseData.body["2"].imageUrl,
            responseData.body["3"].imageUrl,
          ]);
          setRealImagesLoaded(true);
        } else {
        alert('책 제작 요청에 실패했습니다. 다시 시도해주세요.');
        }

      } else {
        alert('제출에 실패했습니다. 다시 시도해주세요.');
      }
      
    } catch (error) {
      alert('에러가 발생했습니다. 다시 시도해주세요.');
      console.error('Error submitting story:', error);
    }
  };

  useEffect(() => {
    setDisplayedText(''); 
    let i = 0;
    const typingEffect = (currentText: string) => {
      if (i < responseContent.length) {
        setDisplayedText(currentText + responseContent[i]);
        i++;
        setTimeout(() => typingEffect(currentText + responseContent[i - 1]), 50);
      }
    };
  
    if (responseContent) {
      typingEffect('');
    }
  }, [responseContent]);

  useEffect(() => {

    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [displayedText]); 

  useEffect(() => {
    if (displayedText === responseContent) {
      setIsTypingCompleted(true);
    }
  }, [displayedText, responseContent]);

  useEffect(() => {
    if (isTypingCompleted && imageUrls.length > 0) {
      setIsImageBlurCompleted(false);
      setTimeout(() => {
        setIsImageBlurCompleted(true);
        setTimeout(() => {
          if (bookData) {
            setShowNavigateButton(true);
          }
        }, 2000);
      }, 5000); 
    }
  }, [isTypingCompleted, imageUrls, bookData]);

  const loadingTexts = [
    "당신의 글이 잘 전송되었어요",
    "요정이 글을 잘 받았어요",
    "열심히 글을 읽고 있어요",
    "동화책으로 만들고 있어요",
    "잠시만 기다려 주세요",
  ];
  const handleButtonClick = () => {
    handleSubmit();
  };


  
  if (isLoading) {
    return (
      <div className="hero min-h-[60vh] ">
        <div className="hero-content text-center">
          <div className="w-[60vw] h-[20vh]">
          <Swiper
              spaceBetween={0}
              centeredSlides={true}
              loop={true}
              direction="vertical"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Autoplay]}
              className="mySwiper"
              style={{ width: '100%', height: '100%' }}
            >
              {loadingTexts.map((text, index) => (
                <SwiperSlide key={index}>
                  <h1 className="text-3xl font-bold mb-4">{text}</h1>
                </SwiperSlide>
              ))}
            </Swiper>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    </div>
    );

  }

  if (responseContent) {
    return (
      <div className="hero min-h-[60vh] bg-white rounded-2xl shadow-lg p-4 glass">
        <div className="hero-content text-center">
          <div className="w-[60vw]">
            <h1 className="text-2xl font-bold mb-4">동화가 완성됐어요!</h1>
            <h2 className="text-2xl font-bold mb-4">그림도 곧바로 보여줄게요</h2>
            <div className="divider"></div> 
            <textarea placeholder="여기에 간단히 적어줘" 
              className="textarea textarea-bordered textarea-lg w-full" 
              rows={ 6 }
              ref={ textAreaRef }
              value={ displayedText }
              readOnly
            ></textarea>
            <div className="divider"></div> 
            <div className="flex justify-around gap-2">
            {imageUrls.map((url, index) => (
              <Image
                key={ index }
                src={ url }
                alt={ `Image ${index + 1}` }
                width = { 200 }
                height = { 200 }
                className={realImagesLoaded ? 'blur-effect1' : 'blur-effect2' }
              />
            ))}
            </div>
            {showNavigateButton && (
              <Link href={`/book/${bookData?._id}`} passHref>
                <button className="btn btn-primary mt-4">
                  책 보러 가기
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-[60vh] bg-white rounded-2xl shadow-lg p-4 glass">
      <div className="hero-content text-center">
        <div className="w-[60vw]">
          <h1 className="text-3xl font-semibold mb-2">동화로 만들고 싶은 이야기를 적어 주세요.</h1>
          <h1 className="text-3xl font-semibold mb-2">내가 겪었던 일도 괜찮고, 내가 상상한 이야기를 적어도 괜찮아요.</h1>
          <div className="divider"></div> 
          <textarea placeholder="오늘은 가족들과 바다로 여행을 갔다. 동생과 바다에서 수영도 하고, 모래 사장에서 모래성도 쌓았다. 열심히 놀았더니 배가 너무 고팠다. 부모님이 바닷가 근처 식당에서 해물 라면을 사 주셨다. 수영 후에 먹는 라면은 정말 맛있었다. 다음에도 또 바다로 여행을 가고 싶다." 
            className="textarea textarea-bordered textarea-lg w-full" 
            rows={ 6 }
            value={ text }
            onChange={handleChange}
            ></textarea>
          <div className="divider"></div> 
          <div className = "flex justify-between">
            <Link href={`/writing`} passHref>
              <button className="btn btn-primary">뒤로 가기</button>
            </Link>
            <button className="btn btn-primary" onClick = { handleButtonClick }>동화책 만들기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleWritingForm;
