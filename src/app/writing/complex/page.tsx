'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addText } from '@/store/textSlice';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const messages = [
  '안녕, 만나서 반가워.',
  '난 글쓰기를 도와 줄 요정이야.',
  '언제, 어디에서, 누가, 무슨 일이 있었는지 알려 줄래?',
];

interface Exchange {
  question: string;
  answer: string;
}

const ComplexWritingPage: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  let token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  const [audioSrc, setAudioSrc] = useState('');
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [conversation, setConversation] = useState<Exchange[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech API. Please try Google Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechEvent = event as SpeechRecognitionEvent;
      const transcript = Array.from(speechEvent.results)
        .map((result) => result[0].transcript)
        .join('');
      setText(transcript);
      console.log(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`Speech recognition error: ${event.error}`);
      console.error(`Speech recognition error: ${event.error}`);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, dispatch]);

  const playKeypressSound = () => {
    if (currentAudio) {
      currentAudio.pause();
    }

    const newAudio = new Audio(
      'https://s3.ap-northeast-2.amazonaws.com/storify/public/chat-1706736584014.mp3',
    );
    newAudio.play();

    setCurrentAudio(newAudio);
  };

  const playAudio = async () => {
    try {
      const textToSpeak = messages.join(' ');
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/ai/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: textToSpeak }),
      });

      if (!response.ok) {
        throw new Error('TTS 요청 실패');
      }

      const data = await response.text();

      if (currentAudio) {
        currentAudio.pause();
      }
      const newAudioSrc = `data:audio/mp3;base64,${data}`;
      setAudioSrc(newAudioSrc);

      const audio = new Audio(newAudioSrc);
      await audio.play();
      setCurrentAudio(audio);
    } catch (error) {
      console.error('TTS 요청 중 에러 발생:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleClick = () => {
    playKeypressSound();
    handleSendButtonClick();
  };

  const handleSendButtonClick = async () => {
    if (isSending || text.trim() === '') return;

    setIsSending(true);
    setIsQuestionLoading(true);

    dispatch(addText(text));
    setText('');
    const updatedConversation = [...conversation, { question: text, answer: '' }];
    setConversation(updatedConversation);
    const combinedMessages = updatedConversation.map((item) => item.question).join(' ');
    if (currentStep < 2) {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/ai/question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: combinedMessages }),
        });

        if (response.ok) {
          const responseText = await response.text();

          const ttsResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/ai/tts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message: responseText }),
          });

          if (ttsResponse.ok) {
            const ttsData = await ttsResponse.text();
            const audioSrc = `data:audio/mp3;base64,${ttsData}`;
            const audio = new Audio(audioSrc);
            audio.play();
          } else {
            console.error('TTS 요청 실패');
          }
          setConversation((convo) =>
            convo.map((item, idx) =>
              idx === convo.length - 1 ? { ...item, answer: responseText } : item,
            ),
          );
          setCurrentStep(currentStep + 1);
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    if (currentStep >= 2) {
      router.push('/writing/complex/waiting');
    }
    setIsSending(false);
    setIsQuestionLoading(false);
  };

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    messages.forEach((message, index) => {
      const id = setTimeout(() => {
        setDisplayedMessages((prevMessages) => [...prevMessages, message]);
      }, 1000 * index);
      timeoutIds.push(id);
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustScroll = () => {
      if (inputRef.current) {
        const inputHeight = inputRef.current.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        const bottomPosition = inputRef.current.getBoundingClientRect().bottom;

        if (bottomPosition > screenHeight) {
          window.scrollTo({
            top: scrollPosition + (bottomPosition - screenHeight),
            behavior: 'smooth',
          });
        }
      }
    };
    adjustScroll();

    const observer = new MutationObserver(adjustScroll);
    if (inputRef.current) {
      observer.observe(inputRef.current, { childList: true });
    }

    return () => observer.disconnect();
  }, [conversation]);

  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg: w-[75vw] xl:w-[70vw]">
      <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 text-base-content">요정의 질문에 답을 해 보세요.</h1>
      <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-0 sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 text-base-content">
        세 번만 대답하면 요정이 동화책을 만들어 줄 거예요.
      </h1>
      <div className="divider"></div>
      {displayedMessages.map((message, index) => (
        <div key={index} className="chat chat-start mb-2">
          <div className="chat-image avatar">
            <div className="w-12 rounded-full">
              <Image
                alt="Tailwind CSS chat bubble component"
                src="https://s3.ap-northeast-2.amazonaws.com/storify/public/fairy-1706712996223.jpeg"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="flex">
            <div className="chat-bubble">{message}</div>
            {index === 0 && (
              <button onClick={playAudio} className="btn btn-circle btn-outline ml-4">
                <div className="w-8 h-8 relative">
                  <Image
                    src="https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-speaker-volume-3606847-1706733545145.png"
                    width={500}
                    height={500}
                    objectFit="scale-down"
                    alt="play audio"
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      ))}
      {conversation.map((exchange, index) => (
        <div key={index}>
          <div className="chat chat-end ">
            <div className="chat-image avatar">
              <div className="w-12 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                <Image
                  alt="Tailwind CSS chat bubble component"
                  src="https://s3.ap-northeast-2.amazonaws.com/storify/public/free-icon-person-7542670-1706734232917.png"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="chat-bubble chat-bubble-success">{exchange.question}</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-12 rounded-full">
                <Image
                  alt="Tailwind CSS chat bubble component"
                  src="https://s3.ap-northeast-2.amazonaws.com/storify/public/fairy-1706712996223.jpeg"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            {isQuestionLoading && index === conversation.length - 1 ? (
              <div className="chat-bubble">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : (
              <div className="chat-bubble">{exchange.answer}</div>
            )}
          </div>
        </div>
      ))}
      <div className="divider"></div>
      {currentStep < 3 && (
        <div ref={inputRef}>
          <input
            className="input input-default input-bordered w-full text-base-content"
            value={text}
            onChange={handleChange}
            autoFocus
            placeholder=""
            onKeyUp={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !isSending) {
                event.preventDefault();
                playKeypressSound();
                handleSendButtonClick();
              }
            }}
          />
          <div className="flex justify-between mt-4">
            <Link href={`/writing`} passHref>
              <button className="btn font-bold border-2">뒤로가기</button>
            </Link>
            <button
              onClick={() => setIsListening((prevState) => !prevState)}
              className={`btn font-bold border-2 btn-error ${isListening ? '' : 'btn-outline'}`}
            >
              {isListening ? '마이크 끄기' : '마이크 켜기'}
            </button>
            {currentStep < 2 ? (
              <button className="btn btn-primary font-bold border-2" onClick={handleClick} disabled={isSending}>
                보내기
              </button>
            ) : (
              <Link href={`/writing/complex/waiting`} passHref>
                <button className="btn btn-primary font-bold border-2" disabled={isSending}>
                  동화책 만들기
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplexWritingPage;
