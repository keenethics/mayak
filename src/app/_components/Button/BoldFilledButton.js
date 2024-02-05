import React from 'react';
import PropTypes from 'prop-types';
import { stylesCore } from '@/app/styles/constants/coreStyles';
import { buttonCoreStyles } from '@/app/styles/constants/buttonCoreStyles';
import { Paragraph3 } from '../Typeography';

export default function BoldFilledButton({
  children,
  type,
  icon,
  disabled = false,
  onClick,
}) {
  const buttonStyle = `${stylesCore.flex.fullCenteredInlineFlex} ${
    buttonCoreStyles.coreStyle
  } ${!icon && 'py-[12px] px-[0px]'} ${type.regular || ''}`;

  const layoutStyle = `${stylesCore.flex.fullCenteredFlex} gap-[8px] ${
    icon
      ? 'pt-[12px] pr-[24px] pb-[12px] pl-[16px]'
      : 'py-[0px] px-[24px] self-stretch'
  }`;

  return (
    <button
      className={`${buttonStyle} ${type.hover} ${type.focused} ${type.active} ${type.disabled}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={layoutStyle}>
        {icon}
        <Paragraph3 styles={'text-inherit font-bold'}>{children}</Paragraph3>
      </div>
    </button>
  );
}

BoldFilledButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.shape({
    regular: PropTypes.string.isRequired,
    hover: PropTypes.string,
    focused: PropTypes.string,
    active: PropTypes.string,
    disabled: PropTypes.string,
  }),
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
