'use client';
import StyledComponentsRegistry from '../lib/registry'
import GlobalStyles from '../app/styles/GlobalStyles';
import { QueryContext } from "./queryContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <StyledComponentsRegistry>
          <GlobalStyles />
          <QueryContext>{children}</QueryContext>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
