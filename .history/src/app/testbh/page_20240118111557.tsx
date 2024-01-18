"use client"
import React, { useState, FC } from 'react';
import ParentComponent from '@/components/modal/parentmodal';

const HomePage: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-4">
      <button onClick={openModal} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
        Open Modal
      </button>
      <ResponsiveModal show={modalOpen} onClose={closeModal}>
        <p className="text-lg">This is a responsive modal!</p>
      </ResponsiveModal>
    </div>
  );
};

export default HomePage;
