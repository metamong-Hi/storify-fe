"use client"
import Image from 'next/image'
import Header from '@/components/Header'
import ThreeScene from '@/components/ThreeScene'
import bigButton from '@/components/buttons/bigButton'
import DoubleModal from '@/components/modal/doubleModal'
import SignupPage from '@/components/SignupPage'
import React, { useState } from 'react';
export default function Test() {
  const [showModal, setShowModal] = React.useState(false);

  // 모달을 열고 닫는 함수
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button onClick={handleToggleModal}>Open Modal</button>
      <DoubleModal show={showModal} onClose={handleToggleModal} children1={"hi"} children2={<SignupPage />}>
        {/* children1에는 Signup 컴포넌트, children2에는 다른 내용을 넣을 수 있습니다. */}
      </DoubleModal>
    </div>
  );
}
