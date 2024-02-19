'use client';
import './globals.css';

import { Provider } from 'react-redux';
import { store } from '../store/index';

import { Providers } from './providers';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/home/footer/Footer';
import Banner from '@/components/forms/banner';
import { ThemeProvider } from '@/components/Setting/ThemeContext';
import {GoogleAnalytics} from '@next/third-parties/google'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr" data-theme="light">
      <body className="font-KyoboHand">
        <Provider store={store}>
          <Providers>
            <ThemeProvider>
              <NavigationBar />
              <Banner />
              <main className="pb-20 bg-base-100 ">{children}</main>
              <Footer />
            </ThemeProvider>
          </Providers>
        </Provider>
      </body>
      <GoogleAnalytics gaId='G-PQN39348RK'/>
    </html>
  );
}
