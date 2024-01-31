'use client';
import StyledComponentsRegistry from '../lib/registry'
import GlobalStyles from '../app/styles/GlobalStyles';
import Header from "@/app/_components/Header"
import Footer from "@/app/_components/Footer";
import { QueryContext } from "./queryContext";

import Providers from './Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <StyledComponentsRegistry>
          <Providers>
            <GlobalStyles />
            <Header />
            <QueryContext>{children}</QueryContext>
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
