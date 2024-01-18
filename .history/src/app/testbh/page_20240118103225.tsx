// pages/index.tsx or any other component
import React, { useState, FC } from 'react';
import Form from '@/components/forms/signupForm';

const HomePage: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-4">

    </div>
  );
};

export default HomePage;
