"use client"
import Image from 'next/image'
import Header from '@/components/Header'
import ThreeScene from '@/components/ThreeScene'
import bigButton from '@/components/buttons/bigButton'
import ResponsiveModal from '@/components/modal/onemodal'
import React, { useState } from 'react';
export default function Test() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="flex flex-col h-screen">
     <Header/>
     <ResponsiveModal show={showModal} onClose={() => setShowModal(false)}>
          <p>This is the content of the first modal!</p>
        </ResponsiveModal>
    </div>
  )
}
