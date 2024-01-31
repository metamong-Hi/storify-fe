import React from 'react';
import Header from '@/components/Header';
import WebSocketTest from '@/components/websocket/WebsocketTest';
export default function Page({ params }: { params: { bookId: string } }) {
    const bookId = params.bookId; // Assign the bookId to a variable
    return (
        <div className="flex flex-col h-screen">
            < WebSocketTest/>
        </div>
    );
}
