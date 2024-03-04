import React from 'react';
import PropTypes from 'prop-types';
import { Footer, Header, Hint } from '@components';
import { cn } from '@utils/cn';
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
    <html lang="en" className="scroll-smooth">
      <body className={cn(montserrat.className, 'relative scroll-smooth')}>
        <div className="flex min-h-screen flex-col">
          <Hint>
            <Header />
            <QueryContext>
              <main className="relative flex-1 bg-other-white lg:mt-[111px]">{children}</main>
            </QueryContext>
            <Footer />
          </Hint>
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
