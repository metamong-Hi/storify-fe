import React from 'react';
import Image from 'next/image'; // Assuming you are using Next.js
import './pencil.css'

type PencilProps = {
  onClick?: () => void;
};
const Pencil: React.FC<PencilProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={`pencil-container`}>
      <Image src="/images/buttons/pencil.png" alt="Pencil" width={50} height={50} />
    </div>
  );
};

export default Pencil;
