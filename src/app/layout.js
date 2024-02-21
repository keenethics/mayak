import React from 'react';
import P from 'prop-types';
import { Footer, Header } from '@components';
import { QueryContext } from './queryContext';
import montserrat from '@/app/styles/font';
import { Hint } from './_components/Hint';
import './globals.css';
import { cn } from '@/utils/cn';

export const metadata = {
  title: {
    template: '%s | Маяк',
    default: 'Маяк',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(montserrat.className, 'relative')}>
        <Hint>
          <Header />
          <QueryContext>
            <main>{children}</main>
          </QueryContext>
          <Footer />
          <div id="modal-root" />
        </Hint>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
