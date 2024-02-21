import React from 'react';
import P from 'prop-types';
import { Footer, Header, Hint } from '@components';
import { QueryContext } from './queryContext';
import montserrat from '@/app/styles/font';
import { cn } from '@/utils/cn';

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
      <body className={cn(montserrat.className, 'relative')}>
        <Hint>
          <div className="flex min-h-screen flex-col">
            <Header />
            <QueryContext>
              <main className="flex-1">{children}</main>
            </QueryContext>
            <Footer />
          </div>
          <div id="modal-root" />
        </Hint>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
