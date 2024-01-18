"use client"
import React, { useState } from 'react';
import doubleModal from '@/components/modal/doubleModal';

const ParentComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <button onClick={() => setModalShow(true)}>Open Modal</button>
      <doubleModal show={modalShow} onClose={() => setModalShow(false)}>
        {/* Insert any content you want in the modal here */}
        <p>This is the content of the modal!</p>
      </doubleModal>
    </div>
  );
};

export default ParentComponent;
