import React from 'react';
import Header from '@/components/Header';
import SignupPage from '@/components/SignupPage';
export default function Page({ params }: { params: { bookId: string } }) {
    const bookId = params.bookId; // Assign the bookId to a variable
    return (
        <div className="flex flex-col h-screen">
            <SignupPage />
        </div>
    );
}
