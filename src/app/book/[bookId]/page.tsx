'use client';
import React, { useState, useEffect } from 'react';
import MyBook from '@/components/MyBook';
import Header from '@/components/Header';
export default function Page({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  return (
    <div className="flex flex-col h-screen">
      <MyBook bookId={params.bookId} />
    </div>
  );
}
