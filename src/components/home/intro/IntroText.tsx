import React from 'react';

interface IntroTextProps {
  children: React.ReactNode;
}

const IntroText: React.FC<IntroTextProps> = ({ children }) => {
  return (
    <p
      className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 text-base-content"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {children}
    </p>
  );
};

export default IntroText;
