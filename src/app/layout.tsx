'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import { store } from '../store/index';
const inter = Inter({ subsets: ['latin'] });
import { Providers } from './providers';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <Providers>
                        <Header />
                        <div className="bg-white scrollbar-hide flex justify-center items-center ">
                            {children}
                        </div>
                    </Providers>
                </Provider>
            </body>
        </html>
    );
}
