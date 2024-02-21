import React from 'react';

interface IntroHeadingProps {
  children: React.ReactNode;
}

const IntroHeading: React.FC<IntroHeadingProps> = ({ children }) => {
  return (
    <h3
      className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-0 sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 font-bold text-base-content"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {children}
    </h3>
  );
};

export default IntroHeading;
