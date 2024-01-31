'use client';
import StyledComponentsRegistry from '../lib/registry'
import GlobalStyles from '../app/styles/GlobalStyles';
import { QueryContext } from "./queryContext";
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <QueryContext>{children}</QueryContext>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
