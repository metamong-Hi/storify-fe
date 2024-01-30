'use client';
import React, { useState, useEffect, useRef  } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay} from 'swiper/modules';


interface ComplexWritingFormProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface BookData {
  _id: string;
}

interface Exchange {
    question: string;
    answer: string;
  }
  

const ComplexWritingForm: React.FC<ComplexWritingFormProps> = ({
  text,
  setText,
}) => {
  let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [responseContent, setResponseContent] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [isImageBlurCompleted, setIsImageBlurCompleted] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [conversation, setConversation] = useState<Exchange[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [responseMessage, setResponseMessage] = useState(""); // 서버 응답 메시지를 저장할 상태 변수
  const loadingTexts = [
    "요정이 글을 잘 받았어요",
    "열심히 글을 읽고 있어요",
    "동화책처럼 만들고 있어요"
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async ( combinedMessages:String ) => {
    setIsSubmitLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: combinedMessages }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseContent(data.content);
        setIsSubmitLoading(false);
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

  const handleSendButtonClick = async () => {
    setIsQuestionLoading(true);
        const updatedConversation = [...conversation, { question: text, answer: "" }];
      setConversation([...conversation, { question: text, answer: "" }]);
        // 모든 유저 메시지를 하나의 문자열로 결합
  const combinedMessages = updatedConversation.map(item => item.question).join(' ');
  if (currentStep < 3) {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: combinedMessages }),
        });
  
        if (response.ok) {
          const responseText = await response.text();
          // 서버 응답을 대화 목록에 추가
          setConversation(convo => 
            convo.map((item, idx) => 
              idx === convo.length - 1 ? { ...item, answer: responseText } : item
            )
          );
          setText('');
          setCurrentStep(currentStep + 1);
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      } else {
        // 마지막 단계에서 handleSubmit 호출
        handleSubmit(combinedMessages);
      }

    setIsQuestionLoading(false);
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
            window.location.href = `/book/${bookData._id}`;
          }
        }, 2000);
      }, 5000); 
    }
  }, [isTypingCompleted, imageUrls, bookData]);

  if (isSubmitLoading) {
    return (
      <div className="hero min-h-[60vh] bg-base-200">
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
      <div className="hero min-h-[60vh] bg-base-200">
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
                className="blur-effect"
              />
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="hero min-h-[60vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="w-[60vw]">
          <h1 className="text-2xl font-bold mb-4">요정과 대화하면서</h1>
          <h1 className="text-2xl font-bold mb-4">동화책을 같이 만들어보자</h1>
          <div className="divider"></div> 
          <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <Image alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" width={30} height={30}/>
                </div>
            </div>
            <div className="chat-bubble">언제, 누구랑, 무슨 일이 있었니?</div>
          </div>

          {conversation.map((exchange, index) => (
    <div key={index}>
      <div className="chat chat-end ">
        <div className="chat-bubble ">{exchange.question}</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <Image alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" width={30} height={30}/>
                </div>
            </div>
        {isQuestionLoading && index === conversation.length-1? (
          <div className="chat-bubble"><span className="loading loading-spinner"></span></div>
        ) : (
          <div className="chat-bubble">{exchange.answer}</div>
        )}
      </div>
    </div>
  ))}
          <div className="divider"></div> 
          {currentStep < 4 && (
            <>
            <input
              className="input input-bordered w-full"
              value={text}
              onChange={handleChange}
              placeholder="여기에 적어줘"
              />
              <div className="flex justify-between">
                <button className="btn btn-primary">뒤로가기</button>
                <button className="btn btn-primary" onClick={handleSendButtonClick}>보내기</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplexWritingForm;
