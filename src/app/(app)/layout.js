import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Hint } from '@components/Hint';

export const metadata = {
  title: {
    template: '%s | Маяк',
    default: 'Маяк',
  },
};

export default function Layout({ children }) {
  return (
    <Hint>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </div>
    </Hint>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
