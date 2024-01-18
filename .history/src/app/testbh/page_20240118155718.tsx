"use client"
import React, { useState, FC } from 'react';
import OneModal from '@/components/modal/oneModal';
import TwoModal from '@/components/modal/twoModal';

const ParentComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <button onClick={() => setModalShow(true)}>Open Modal</button>
      <OneModal show={modalShow} onClose={() => setModalShow(false)}>
        {/* Insert any content you want in the modal here */}
        <p>This is the content of the modal!</p>
      </OneModal>
    </div>
  );
};

export default ParentComponent;
