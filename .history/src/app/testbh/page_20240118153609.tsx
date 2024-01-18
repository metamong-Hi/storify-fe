"use client"
import React, { useState, FC } from 'react';
import oneModal from '@/components/modal/oneModal';

const HomePage: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-4">
      <one
    </div>
  );
};

export default HomePage;
