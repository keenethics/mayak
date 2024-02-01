'use client';

import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider as Provider } from 'styled-components';
import StyledComponentsRegistry from '../lib/registry';
import theme from './styles/theme';

const ThemeProvider = props => (
  <StyledComponentsRegistry>
    <Provider theme={theme}>{props.children}</Provider>
  </StyledComponentsRegistry>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
