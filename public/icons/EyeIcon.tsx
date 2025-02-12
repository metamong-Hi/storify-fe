import React from 'react';
import styled from 'styled-components';
const StyledEye = styled.i`
  & {
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 24px;
    height: 18px;
    border-bottom-right-radius: 100px;
    border-bottom-left-radius: 100px;
    overflow: hidden;
    box-sizing: border-box;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    border-radius: 100px;
    position: absolute;
    box-sizing: border-box;
  }
  &::after {
    top: 2px;
    box-shadow:
      inset 0 -8px 0 2px,
      inset 0 0 0 2px;
    width: 24px;
    height: 24px;
  }
  &::before {
    width: 8px;
    height: 8px;
    border: 2px solid;
    bottom: 4px;
    left: 8px;
  }
`;
export const EyeIcon = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function Eye(props, ref) {
    return (
      <>
        <StyledEye {...props} ref={ref} icon-role="eye" />
      </>
    );
  },
);
