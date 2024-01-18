"use client"
import React, { useState, FC } from 'react';
import singleModal from '@/components/modal/singleModal';
import doubleModal from '@/components/modal/doubleModal';

const ParentComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <TwoModal />

    </div>
  );
};

export default ParentComponent;
