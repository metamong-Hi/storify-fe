"use client"
import React, { useState, FC } from 'react';
import OneModal from '@/components/modal/oneModal';
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
