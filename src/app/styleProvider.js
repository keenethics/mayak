'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import P from 'prop-types';
import StyledComponentsRegistry from '../lib/registry';
import theme from '@/app/styles/theme';

export default function StyleProvider({ children }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}

StyleProvider.propTypes = {
  children: P.node.isRequired,
};
