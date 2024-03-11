import React from 'react';
import P from 'prop-types';
import { QueryContext } from './queryContext';
import montserrat from '@/app/styles/font';

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
    <html lang="ua">
      <body className={cn(montserrat.className, 'relative scroll-smooth')}>
        <QueryContext>
          <main className="bg-other-white">{children}</main>
        </QueryContext>
        <div id="modal-root" />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
