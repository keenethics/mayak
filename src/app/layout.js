'use client';
import StyledComponentsRegistry from '../lib/registry'
import GlobalStyles from '../app/styles/GlobalStyles';
import { QueryContext } from "./queryContext";
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Providers from './Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <StyledComponentsRegistry>
          <Providers>
            <GlobalStyles />
            <QueryContext>{children}</QueryContext>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
