'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import { store } from '../store/index';
const inter = Inter({ subsets: ['latin'] });
import { Providers } from './providers';
import NavbarComponent from '@/components/NavbarComponent';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Providers>
            <NavbarComponent />

              {children}
            {/* </div> */}
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
