import React from 'react';

interface SVGAttributeProps {
  isClicked: boolean;
}

export const LikeIcon = ({ isClicked }: SVGAttributeProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 233 201"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M166.918..." fill={isClicked ? 'red' : 'gray'} />
    </svg>
  );
};
