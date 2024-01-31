"use client";

import styled from "styled-components";
import mayakLogo from "/public/mayak_logo.svg";
import Image from "next/image";

const AppHeader = styled.header`
  padding: 25px;
  color: ${({ theme }) => theme.colors.primary[600]};
  background-color: ${({ theme }) => theme.colors.primary[100]};
`;

export default function Header() {
  return (
    <AppHeader>
      <Image src={mayakLogo} alt="Mayak logo" width="129" height="74" />
    </AppHeader>
  );
}
