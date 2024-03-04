import React from 'react';
import P from 'prop-types';
import { Footer, Header } from '@components';
import montserrat from '@/app/styles/font';
import { cn } from '@/utils/cn';
import { QueryContext } from './queryContext';
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
      <body className={cn('relative', montserrat.className)}>
        <QueryContext>
          <Header />
          <main className="bg-other-white">{children}</main>
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
