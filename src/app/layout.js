import React from 'react';
import P from 'prop-types';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { QueryContext } from './queryContext';
import montserrat from '@/app/styles/font';

import './globals.css';

export const metadata = {
  title: {
    template: '%s | Маяк',
    default: 'Маяк',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <QueryContext>
          <main>{children}</main>
        </QueryContext>
        <Footer />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
