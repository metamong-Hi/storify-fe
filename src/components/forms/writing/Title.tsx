import React from 'react';

interface TitleProps {
  line1: string;
  line2: string; 
}

const Title: React.FC<TitleProps> = ({ line1, line2 }) => (
  <>
    <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 text-base-content">
      {line1}
    </h1>
    <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold sm:mb-0 md:mb-1 lg:mb-1 xl:mb-2 2xl:mb-2 text-base-content">
      {line2}
    </h1>
  </>
);

export default Title;
