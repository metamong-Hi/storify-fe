import React from 'react';
import Image from 'next/image'; // Assuming you are using Next.js

const Pencil: React.FC = () => {
  return (
    <div>
      <Image src="/images/buttons/pencil.png" alt="Pencil" width={100} height={100} />
    </div>
  );
};

export default Pencil;
