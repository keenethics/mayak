"use client";

import StyledComponentsRegistry from "../lib/registry";
import { ThemeProvider } from "styled-components";
import theme from "@/app/styles/theme";

export default function StyleProvider({ children }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
