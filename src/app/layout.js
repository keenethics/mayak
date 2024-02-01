'use client';

import React from 'react';
import P from 'prop-types';
import StyledComponentsRegistry from '../lib/registry';
import GlobalStyles from './styles/GlobalStyles';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { QueryContext } from './queryContext';
import ThemeProvider from './themeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            <Header />
            <QueryContext>{children}</QueryContext>
            <Footer />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
