'use client';

import './globals.css';

import { Provider } from 'react-redux';
import { store } from '../store/index';

import { Providers } from './providers';
import NavbarComponent from '@/components/NavbarComponent';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body className='bg-[#FAF3E0]'>
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
