import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@components';
import { cn } from '@utils/cn';
import { buttonColorVariant, buttonType } from './style';

export function PillButton({ children, className, icon, variant, colorVariant, ...props }) {
  const buttonVariant = icon ? buttonType[variant]?.icon : buttonType[variant]?.regular;
  const buttonColor = buttonColorVariant?.[variant]?.[colorVariant];

  if (!buttonVariant) {
    throw new Error('Invalid button variant');
  } else if (!buttonColor) {
    throw new Error('Invalid button color variant');
  }

  const { regular, hover, focused, active, disabled: disabledState } = buttonColor;
  const { buttonStyle, layoutStyle } = buttonVariant;

  const styles = cn(
    'gap-[8px] rounded-[100px] font-bold',
    buttonStyle,
    regular,
    hover,
    focused,
    active,
    disabledState,
    className,
  );

  return (
    <button className={styles} {...props}>
      <div className={layoutStyle || ''}>
        {icon}
        <Paragraph className="text-inherit">{children}</Paragraph>
      </div>
    </button>
  );
}

PillButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string.isRequired,
  colorVariant: PropTypes.string.isRequired,
  icon: PropTypes.node,
};
