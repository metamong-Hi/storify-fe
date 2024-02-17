import React from "react";

interface PlayCircleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
}

export const PlayCircleIcon: React.FC<PlayCircleIconProps> = ({
  size = 24,
  width = size,
  height = size,
}) => (
  <svg
    aria-hidden="true"
    fill="#000000" 
    focusable="false"
    height={height}
    role="presentation"
    viewBox="-30 -30 360 360"
    width={width}
    stroke="#000000"
    strokeWidth="0.003"
  >
    <g stroke-width="0" />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <g>
      <path d="M150,0C67.157,0,0,67.162,0,150c0,82.841,67.157,150,150,150s150-67.159,150-150C300,67.162,232.843,0,150,0z M205.846,158.266l-86.557,49.971c-1.32,0.765-2.799,1.144-4.272,1.144c-1.473,0-2.949-0.379-4.274-1.144 c-2.64-1.525-4.269-4.347-4.269-7.402V100.89c0-3.053,1.631-5.88,4.269-7.402c2.648-1.528,5.906-1.528,8.551,0l86.557,49.974 c2.645,1.53,4.274,4.352,4.269,7.402C210.12,153.916,208.494,156.741,205.846,158.266z"/>
    </g>
  </svg>
);

export default PlayCircleIcon;
