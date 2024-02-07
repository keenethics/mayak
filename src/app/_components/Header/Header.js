import React from "react";
import { PillButton } from "../PillButton";
import {
  buttonColorVariant,
  buttonType,
} from "@/app/styles/constants/buttonCoreStyles";
import { Paragraph } from "../Typography";

export default function Header() {
  return (
    <header className="bg-primary-100 p-5 text-h1 text-primary-700">
      Header
      <Paragraph className="text-p3 text-primary-500">Label</Paragraph>
      <PillButton
        type={buttonType.outlined}
        colorVariant={buttonColorVariant.outlined.blue}
        className="text-p3 hover:bg-secondary-100"
      >
        Зворотній зв'язок
      </PillButton>
      <PillButton
        type={buttonType.outlined}
        colorVariant={buttonColorVariant.filled.blue}
        disabled={true}
        className="hover:bg-secondary-100"
      >
        Зворотній зв'язок
      </PillButton>
      <PillButton
        type={buttonType.filledBold}
        colorVariant={buttonColorVariant.filled.blue}
        className="hover:bg-secondary-100"
      >
        Надіслати
      </PillButton>
      <PillButton
        type={buttonType.filledBold}
        colorVariant={buttonColorVariant.filled.blue}
        className="hover:bg-secondary-100"
        disabled={true}
      >
        Надіслати
      </PillButton>
    </header>
  );
}
