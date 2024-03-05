import React from 'react';
import P from 'prop-types';
import { Hint } from '@components';
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
        <Hint>
          <QueryContext>
            <main className="bg-other-white">{children}</main>
          </QueryContext>
          <div id="modal-root" />
        </Hint>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
