import React from 'react';
import PropTypes from 'prop-types';
import { stylesCore } from '@/app/styles/constants/coreStyles';
import Paragraph4 from '../Typeography/Paragraph4';
import { buttonCoreStyles } from '@/app/styles/constants/buttonCoreStyles';

export default function OutlineButton({
  children,
  type,
  icon,
  disabled = false,
  onClick,
}) {
  const buttonStyle = `${stylesCore.flex.fullCenteredInlineFlex} ${
    buttonCoreStyles.coreStyle
  } flex-col ${type.regular || ''} ${!icon && 'h-[2.5rem] flex-shrink-0'}`;

  const layoutStyle = `${
    stylesCore.flex.fullCenteredFlex
  } gap-[8px] self-stretch ${
    icon
      ? 'h-[2.5rem] pt-[10px] pr-[24px] pb-[10px] pl-[16px]'
      : 'flex-grow flex-shrink-0 flex-basis-0 py-[10px] px-[24px]'
  }`;

  return (
    <button
      className={`${buttonStyle} ${type.hover} ${type.focused} ${type.active} ${type.disabled}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={layoutStyle}>
        {icon}
        <Paragraph4 styles={'text-inherit font-bold'}>{children}</Paragraph4>
      </div>
    </button>
  );
}

OutlineButton.propTypes = {
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
