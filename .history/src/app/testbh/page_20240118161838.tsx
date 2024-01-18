"use client"
"use client"
import React, { useState } from 'react';
import DoubleModal from '@/components/modal/doubleModal';

const ParentComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <button onClick={() => setModalShow(true)}>Open Modal</button>
      <DoubleModal 
        show={modalShow} 
        onClose={() => setModalShow(false)}
        children1={<p>This is the content of the first modal!</p>}
        children2={<p>And here&#39s content for the second modal.</p>}
      />
    </div>
  );
};

export default ParentComponent;

