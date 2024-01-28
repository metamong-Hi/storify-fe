'use client';
import React, { useState, useEffect, useRef  } from 'react';
import Link from 'next/link';
import { Textarea } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image,Spinner } from '@nextui-org/react';

interface BackgroundWritingFormProps {
  destination: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface BookData {
  _id: string;
}

const BackgroundWritingForm: React.FC<BackgroundWritingFormProps> = ({
  text,
  setText,
  destination,
}) => {
  let token: string | null;
  const [isLoading, setIsLoading] = useState(false);
  const [responseContent, setResponseContent] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [isImageBlurCompleted, setIsImageBlurCompleted] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
 
    const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      setIsLoading(true);
      const storedPeopleText = localStorage.getItem('peopleText') || '';
      const storedEventsText = localStorage.getItem('eventsText') || '';
      const finalText = storedPeopleText + storedEventsText + text;

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/ai/stories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: finalText }),
        });
        if (response.ok) {
          const data = await response.json();
          setResponseContent(data.content);
          setIsLoading(false);
          // 두 번째 POST 요청
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
            responseData.body[1].imageUrl,
            responseData.body[2].imageUrl,
            responseData.body[3].imageUrl,
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
        // 블러 효과가 있는 이미지를 띄움
        setIsImageBlurCompleted(false);
        // 5초 후에 블러 효과 제거
        setTimeout(() => {
          setIsImageBlurCompleted(true);
          // 블러 효과가 사라진 후 1초 후에 리디렉션
          setTimeout(() => {
            if (bookData) {
              window.location.href = `/book/${bookData._id}`;
            }
          }, 1000); // 여기에서 1000은 이미지가 완전히 나타난 후 리디렉션하기 전 대기 시간입니다.
        }, 5000); // 여기에서 5000은 블러 효과를 제거하기 위한 시간입니다.
      }
    }, [isTypingCompleted, imageUrls, bookData]);
    
    const handleButtonClick = () => {
      handleSubmit();
    };

    if (isLoading) {
      return (
        <Card className="w-[70vw] max-h-full mt-10">
          <CardHeader className="flex flex-col justify-center items-center p-4">
            <p className="text-3xl flex-grow text-center">잠시만 기다려주세요</p>
            <p className="text-3xl flex-grow text-center">동화책을 만들고 있어요</p>
          </CardHeader>
          <CardBody className="flex justify-center items-center">
            <Spinner label="로딩중" color="primary" size="lg" />
          </CardBody>
        </Card>
      );
  
    }
  
    if (responseContent) {
      return (
        <Card className="w-[70vw] max-h-full mt-10">
          <CardHeader className="flex flex-col justify-center items-center p-4">
            <p className="text-3xl flex-grow text-center">동화가 완성됐어!</p>
            <p className="text-3xl flex-grow text-center">그림도 그려서 곧바로 보여줄거야.</p>
          </CardHeader>
          <CardBody>
          <Textarea
          ref={textAreaRef}
          isReadOnly
          label="동화 스토리"
          variant="bordered"
          labelPlacement="outside"
          placeholder=""
          value={displayedText}
          size="lg"
            minRows={6}
            style={{ fontSize: '1.25rem', borderColor: '#EABF9F'}}
        />
          <div className="flex justify-around gap-2 mt-2">
      {imageUrls.map((url, index) => (
        <Image
          key={index}
          src={url}
          alt={`Image ${index + 1}`}
          className={`w-60 h-auto blur-effect`}
        />
      ))}
    </div>
          </CardBody>
        </Card>
      );
    }
  return (
    <Card className="w-[70vw] max-h-full mt-10">
      <CardHeader className="flex flex-col justify-center items-center p-4">
        <p className="text-3xl">언제,어디에서 있었던 일인지 자세히 적어줘.</p>
        <p className="text-3xl">보내기 버튼을 누르면 동화책이 만들어질거야!</p>
      </CardHeader>
      <CardBody>
        <Textarea
          placeholder="언제, 어디에서 그런 일이 있었는 지 설명해줘"
          className=" w-full h-full"
          value={text}
          onChange={handleChange}
          variant="bordered"
          color="primary"
          size="lg"
          minRows={6}
          style={{ fontSize: '1.25rem' }}
        />
      </CardBody>

      <CardFooter>
        <div className="flex flex-row justify-between items-center w-full">
          <Link href='/writing/complexWriting/events' passHref>
            <Button color="primary" variant="light" style = {{fontSize: '1.25rem'}}>
              뒤로 가기
            </Button>
          </Link>
          <div className="flex flex-row text-center items-center text-middle">
            <Link href={destination} passHref>
              <Button color="primary" variant="light" onClick={handleButtonClick} style = {{fontSize: '1.25rem'}}>
                보내기
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default BackgroundWritingForm;
