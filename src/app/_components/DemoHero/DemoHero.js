"use client";

import styled from "styled-components";
import device from "@/app/styles/device";

const Title = styled.h1`
  ${({ theme }) => theme.fontStyle.h1};

  @media ${device.tablet} {
    ${({ theme }) => theme.fontStyle.h3};
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.colors.secondary[400]};
`;

export default function DemoHero() {
  return (
    <Title>
      Шукай пункти психологічної підтримки у місті <Span>Львові</Span>
    </Title>
  );
}
