'use client';
import StyledComponentsRegistry from '../lib/registry'
import GlobalStyles from '../app/styles/GlobalStyles';
import Header from "../app/_components/Header"
import Footer from "../app/_components/Footer";
import { QueryContext } from "./queryContext";
import ThemeProvider from './ThemeProvider';
import React from 'react';
import P from 'prop-types'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
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
