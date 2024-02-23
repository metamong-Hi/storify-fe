'use client';
import React from 'react';
import Head from 'next/head';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { NextUIProvider } from '@nextui-org/react';
import NavigationBar from '@/components/NavigationBar';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/home/footer/Footer'), {
  ssr: false,
});
import Banner from '@/components/forms/banner/bar/BannerControl';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr" data-theme="light">
      <Head>
        <title>Stoify</title>
        <meta name="description" content="당신의 경험을 동화책으로 만들어보세요" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <body className="font-KyoboHand">
        <Provider store={store}>
          <NextUIProvider>
            <NavigationBar />
            <Banner />
            <main className="pb-20 bg-base-100 ">{children}</main>
            <Footer />
          </NextUIProvider>
        </Provider>
      </body>
      <GoogleAnalytics gaId="G-PQN39348RK" />
    </html>
  );
}
