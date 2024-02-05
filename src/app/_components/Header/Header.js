import React from 'react';
import { OutlineButton } from '../Button';
import { buttonCoreStyles } from '@/app/styles/constants/buttonCoreStyles';

export default function Header() {
  return (
    <header className="bg-primary-100 p-5 text-h1 text-primary-700">
      Header
      <OutlineButton type={buttonCoreStyles.type.outlined.blue}>
        {"Зворотній зв'язок"}
      </OutlineButton>
      {/* <BoldFilledButton type={buttonCoreStyles.type.filled.blue}>
          Надіслати
        </BoldFilledButton>
        <CloseButton /> */}
    </header>
  );
}
