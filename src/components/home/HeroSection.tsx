import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <>
      <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 font-bold">
        <h1
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 textWithShadow"
          data-aos="fade-up"
        >
          여러분이 주인공인
        </h1>
        <h1
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl textWithShadow"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          동화 세계가 펼쳐집니다!
        </h1>
      </div>
      <div className="mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5">
        <h2
          className="text-gray-200 text-lg md:text-xl lg:text-2xl xl:text-3xl mb-0 sm:mb-0.5 md:mb-1 lg:mb-2 xl:mb-3 2xl:mb-4 textWithShadow"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          이야기를 흥미진진한 동화책으로
        </h2>
        <h2
          className="text-gray-200 text-lg md:text-xl lg:text-2xl xl:text-3xl mb-0 sm:mb-0.5 md:mb-1 lg:mb-2 xl:mb-3 2xl:mb-4 textWithShadow"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          생생한 그림으로 살아나게 해줄 거예요
        </h2>
      </div>
    </>
  );
};

export default HeroSection;
