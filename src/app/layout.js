import React from 'react';
import P from 'prop-types';
import { Inter } from 'next/font/google';
import Header from './_components/Header';
import Footer from './_components/Footer';
import './globals.css';
import { QueryContext } from './queryContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mayak!',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <QueryContext>{children}</QueryContext>
        <Footer />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
