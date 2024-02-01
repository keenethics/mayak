'use client';
import { useState } from 'react';
import { styled } from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.colorName1};
`;
export default function ButtonAsTest() {
    const [count, setCount] = useState(1)
    return (
        <main >
            <Button onClick={() => setCount(prev => prev + 1)}>Click ME</Button>
            {count}
        </main>
    );
}
