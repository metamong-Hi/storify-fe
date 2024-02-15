import React from 'react';
import Header from '@/components/Header';
import LoginPage from '@/components/login/login';
import FriendDrawer from '@/components/drawer/friend';
export default function Page() {
    return (
        <div className="flex flex-col h-screen">
            <LoginPage />
        </div>
    );
}
