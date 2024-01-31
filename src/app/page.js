'use client';
import { styled } from 'styled-components';

export const MyDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.colorName1};
`;
export default function Home() {
  return (
    <main >
      <MyDiv>Hello world</MyDiv>
    </main>
  );
}
