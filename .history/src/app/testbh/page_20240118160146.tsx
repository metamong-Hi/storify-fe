"use client"
import React, { useState, FC } from 'react';
import Single
import TwoModal from '@/components/modal/twoModal';

const ParentComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <TwoModal />

    </div>
  );
};

export default ParentComponent;
