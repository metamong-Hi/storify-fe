'use client';

import './globals.css';

import { Provider } from 'react-redux';
import { store } from '../store/index';

import { Providers } from './providers';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/home/footer/Footer';
import Banner from '@/components/forms/banner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr" data-theme="fantasy">
      <body className="font-KyoboHand">
        <Provider store={store}>
          <Providers>
            <NavigationBar />
            <Banner />
            {children}
            <Footer />
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
