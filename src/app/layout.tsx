'use client';

import './globals.css';

import { Provider } from 'react-redux';
import { store } from '../store/index';

import { Providers } from './providers';
import NavbarComponent from '@/components/NavbarComponent';

import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    { path: 'fonts/210KidsR.woff2', weight: '500', style: 'normal' },
    { path: 'fonts/210KidsB.woff2', weight: '700', style: 'thick' },
    { path: 'fonts/210KidsL.woff2', weight: '300', style: 'thin' },
  ],
  display: 'swap',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr" className={myFont.className}>
      <body>
        <Provider store={store}>
          <Providers>
            <NavbarComponent />
            {children}
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
