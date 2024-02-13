import React from 'react';
import P from 'prop-types';
import { Footer, Header } from '@components';
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
      <body className={[montserrat.className, 'relative']}>
        <Header />
        <QueryContext>
          <main>{children}</main>
        </QueryContext>
        <Footer />
        <div id="modal-root" />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
