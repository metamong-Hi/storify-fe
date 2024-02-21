import React from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface StoryButtonProps {
  isLoggedIn: boolean;
}

const StoryButton: React.FC<StoryButtonProps> = ({ isLoggedIn }) => {
  const router = useRouter();

  const handleStoryButtonClick = () => {
    if (isLoggedIn) {
      router.push('/writing');
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '이 기능을 사용하려면 로그인이 필요합니다.',
        confirmButtonText: '확인',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <button
      className="px-4 py-2 border-2 rounded-lg border-white font-bold cursor-pointer hover:text-black hover:bg-white text-white opacity-90 duration-300 ease-in-out transform text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl textWithShadow"
      data-aos="fade-up"
      data-aos-delay="200"
      onClick={handleStoryButtonClick}
    >
      동화 만들기
    </button>
  );
};

export default StoryButton;
