import React from "react";

interface ShuffleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
  height?: number;
}

export const ShuffleIcon: React.FC<ShuffleIconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.7507 17.9809C21.7507 17.9609 21.7407 17.9409 21.7407 17.9209C21.7307 17.8409 21.7207 17.7609 21.6907 17.6909C21.6507 17.6009 21.6007 17.5309 21.5407 17.4609C21.5407 17.4609 21.5407 17.4509 21.5307 17.4509C21.4607 17.3809 21.3807 17.3309 21.2907 17.2909C21.2007 17.2509 21.1007 17.2309 21.0007 17.2309L16.3307 17.2509C16.3307 17.2509 16.3307 17.2509 16.3207 17.2509C15.7207 17.2509 15.1407 16.9709 14.7807 16.4909L13.5607 14.9209C13.3107 14.5909 12.8407 14.5309 12.5107 14.7909C12.1807 15.0509 12.1207 15.5109 12.3807 15.8409L13.6007 17.4109C14.2507 18.2509 15.2707 18.7509 16.3307 18.7509H16.3407L19.1907 18.7409L18.4807 19.4509C18.1907 19.7409 18.1907 20.2209 18.4807 20.5109C18.6307 20.6609 18.8207 20.7309 19.0107 20.7309C19.2007 20.7309 19.3907 20.6609 19.5407 20.5109L21.5407 18.5109C21.6107 18.4409 21.6607 18.3609 21.7007 18.2709C21.7307 18.1709 21.7507 18.0709 21.7507 17.9809Z"
      fill="currentColor"
    />
    <path
      d="M8.42 6.69172C7.77 5.79172 6.73 5.26172 5.62 5.26172C5.61 5.26172 5.61 5.26172 5.6 5.26172L3 5.27172C2.59 5.27172 2.25 5.61172 2.25 6.02172C2.25 6.43172 2.59 6.77172 3 6.77172L5.61 6.76172H5.62C6.25 6.76172 6.84 7.06172 7.2 7.57172L8.28 9.07172C8.43 9.27172 8.66 9.38172 8.89 9.38172C9.04 9.38172 9.2 9.33172 9.33 9.24172C9.67 8.99172 9.74 8.52172 9.5 8.19172L8.42 6.69172Z"
      fill="currentColor"
    />
    <path
      d="M21.74 6.07875C21.74 6.05875 21.75 6.03875 21.75 6.02875C21.75 5.92875 21.73 5.82875 21.69 5.73875C21.65 5.64875 21.6 5.56875 21.53 5.49875L19.53 3.49875C19.24 3.20875 18.76 3.20875 18.47 3.49875C18.18 3.78875 18.18 4.26875 18.47 4.55875L19.18 5.26875L16.45 5.25875C16.44 5.25875 16.44 5.25875 16.43 5.25875C15.28 5.25875 14.2 5.82875 13.56 6.79875L7.17 16.3787C6.81 16.9187 6.2 17.2487 5.55 17.2487H5.54L3 17.2287C2.59 17.2287 2.25 17.5587 2.25 17.9787C2.25 18.3887 2.58 18.7287 3 18.7287L5.55 18.7387C5.56 18.7387 5.56 18.7387 5.57 18.7387C6.73 18.7387 7.8 18.1688 8.44 17.1988L14.83 7.61875C15.19 7.07875 15.8 6.74875 16.45 6.74875H16.46L21 6.76875C21.1 6.76875 21.19 6.74875 21.29 6.70875C21.38 6.66875 21.46 6.61875 21.53 6.54875C21.53 6.54875 21.53 6.53875 21.54 6.53875C21.6 6.46875 21.66 6.39875 21.69 6.30875C21.72 6.23875 21.73 6.15875 21.74 6.07875Z"
      fill="currentColor"
    />
  </svg>
);
