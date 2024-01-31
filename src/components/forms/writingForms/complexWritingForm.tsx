'use client';
import React, { useState, useEffect, useRef  } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay} from 'swiper/modules';

interface BookData {
  _id: string;
}

interface Exchange {
    question: string;
    answer: string;
  }
  

const ComplexWritingForm  = () => {
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
  const [isSending, setIsSending] = useState(false);
  const [text,setText] = useState("");
  const [showNavigateButton, setShowNavigateButton] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [responseMessage, setResponseMessage] = useState(""); 
  const [realImagesLoaded, setRealImagesLoaded] = useState(false);
  const loadingTexts = [
    "와, 멋진 글이네요!",
    "요정에게 글을 보낼게요.",
    "글이 요정에게 전달되고 있어요.",
    "요정이 글을 받았어요.",
    "요정이 글을 읽고 있어요.",
    "요정이 어떤 동화로 바꿀 지 생각하고 있어요.",
    "곧 요정이 동화를 써 줄 거예요.",

    "요정이 동화책을 만들고 있어요.",
    "잠시만 기다려 주세요.",
  ];
  const messages = [
    "안녕, 만나서 반가워.",
    "난 글쓰기를 도와 줄 요정이야.",
    "대답은 자세하게 할 수록 좋아.",
    "언제, 어디에서, 누가, 무슨 일이 있었는지 알려 줄래?"
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

  const handleSendButtonClick = async () => {
    if (isSending) return;

    setIsSending(true);
    setIsQuestionLoading(true);

    // text 값을 복사하여 저장합니다.
  const currentText = text;
  setText("");
  // 복사된 text 값을 사용하여 conversation을 업데이트합니다.
  const updatedConversation = [...conversation, { question: currentText, answer: "" }];
  setConversation(updatedConversation);
    const combinedMessages = updatedConversation.map(item => item.question).join(' ');
  // text 상태를 먼저 비웁니다.

    if (currentStep < 4) {
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
      setIsSending(false);
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
            setShowNavigateButton(true);
          }
        }, 2000);
      }, 5000); 
    }
  }, [isTypingCompleted, imageUrls, bookData]);

  useEffect(() => {
    // Use a local variable to store timeouts
    const timeouts = messages.map((message, index) => {
      return setTimeout(() => {
        setDisplayedMessages(prev => [...prev, message]);
      }, 1000 * index);
    });

    // Clear timeouts on component unmount
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []); 

  useEffect(() => {
    const scrollToBottom = () => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    };
  
    if (conversation.length > 0 || displayedMessages.length > 0 || realImagesLoaded || showNavigateButton) {
      scrollToBottom();
    }
  }, [conversation, displayedMessages, realImagesLoaded, showNavigateButton]);


  if (isSubmitLoading) {
    return (
      <div className="hero min-h-[60vh] bg-white rounded-2xl shadow-lg p-4 glass">
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
            <h1 className="text-3xl font-semibold mb-2">동화가 완성됐어요!</h1>
            <h2 className="text-3xl font-semibold mb-2">그림도 곧바로 보여줄게요</h2>
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
                className="realImagesLoaded ? 'blur-effect1' : 'blur-effect2'"
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
          <h1 className="text-3xl font-semibold mb-2">요정의 질문에 답을 해 보세요.</h1>
          <h1 className="text-3xl font-semibold mb-2">다섯 번만 대답하면 요정이 동화책을 만들어 줄 거예요.</h1>
          <div className="divider"></div> 
          {displayedMessages.map((message, index) => (
          <div key={index} className="chat chat-start mb-2">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" width={30} height={30}/>
              </div>
            </div>
            <div className="chat-bubble">{message}</div>
          </div>
        ))}


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
          {currentStep < 5 && (
            <>
            <input
              className="input input-bordered w-full"
              value={text}
              onChange={handleChange}
              autoFocus
              placeholder="여기에 적어주세요"
              onKeyUp={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !isSending) {
                  event.preventDefault();
                  handleSendButtonClick();
                }
              }}
              />
              <div className="flex justify-between mt-4">
                <Link href={`/writing`} passHref>
                  <button className="btn btn-primary">뒤로가기</button>
                </Link>
                <button className="btn btn-primary" onClick={ handleSendButtonClick } disabled={isSending}>보내기</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplexWritingForm;
