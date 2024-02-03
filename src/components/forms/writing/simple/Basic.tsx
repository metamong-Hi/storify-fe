// WritingForm.tsx
import React, { useState } from 'react';
import Link from 'next/link';

interface WritingFormProps {
  onSubmit: (text: string) => void;
}

const WritingForm: React.FC<WritingFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');

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
            imageStyle: 'cartoon',
            aiStory: data.content,
            storyId: data.story._id,
          }),
        });

        if (bookResponse.ok) {
          const responseData = await bookResponse.json();
          setBookData(responseData);
          setImageUrls([
            responseData.body['1'].imageUrl,
            responseData.body['2'].imageUrl,
            responseData.body['3'].imageUrl,
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
  const handleButtonClick = () => {
    handleSubmit();
  };

  return (
    <div className="w-[60vw]">
    <h1 className="text-2xl font-semibold mb-2">동화로 만들고 싶은 이야기를 적어 주세요.</h1>
    <h1 className="text-2xl font-semibold mb-2">
      겪었던 일도 괜찮고, 상상한 이야기를 적어도 괜찮아요.
    </h1>
    <div className="divider"></div>
    <textarea
      placeholder="예시 : 오늘은 가족들과 바다로 여행을 갔다. 동생과 바다에서 수영도 하고, 모래 사장에서 모래성도 쌓았다. 열심히 놀았더니 배가 너무 고팠다. 부모님이 바닷가 근처 식당에서 해물 라면을 사 주셨다. 수영 후에 먹는 라면은 정말 맛있었다. 다음에도 또 바다로 여행을 가고 싶다."
      className="textarea textarea-bordered textarea-success textarea-lg w-full"
      rows={6}
      value={text}
      onChange={handleChange}
    ></textarea>
    <div className="divider"></div>
    <div className="flex justify-between">
      <Link href={`/writing`} passHref>
        <button className="btn btn-outline btn-success btn-xm sm:btn-sm md:btn-md lg:btn-lg">
          뒤로 가기
        </button>
      </Link>
      <button
        className="btn btn-outline btn-success btn-xm sm:btn-sm md:btn-md lg:btn-lg"
        onClick={handleButtonClick}
      >
        동화책 만들기
      </button>
    </div>
    </div>
  );
};

export default WritingForm;
