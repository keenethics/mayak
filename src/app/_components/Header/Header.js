'use client';

import React from 'react';
import styled from 'styled-components';

const AppHeader = styled.header`
  padding: 25px;
  color: ${({ theme }) => theme.colors.primary[600]};
  background-color: ${({ theme }) => theme.colors.primary[100]};
`;

export default function Header() {
  return <AppHeader>Header</AppHeader>;
}
