'use client';
import Head from 'next/head';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { Providers } from './providers';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/home/footer/Footer';
import Banner from '@/components/forms/banner/bar/BannerControl';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Stoify</title> 
        <meta name="description" content="당신의 경험을 동화책으로 만들어보세요" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <html lang="kr" data-theme="light">
        <body className="font-KyoboHand">
          <Provider store={store}>
            <Providers>
              <NavigationBar />
              <Banner />
              <main className="pb-20 bg-base-100 ">{children}</main>
              <Footer />
            </Providers>
          </Provider>
        </body>
        <GoogleAnalytics gaId="G-PQN39348RK" />
      </html>
    </>
  );
}
