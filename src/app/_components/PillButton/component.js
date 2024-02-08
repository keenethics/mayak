import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/app/utils/cn';
import { Paragraph } from '../Typography';

export function PillButton({
  children, className, type, colorVariant, icon, disabled = false, onClick,
}) {
  const buttonType = icon ? type?.icon : type?.regular;
  const {
    regular, hover, focused, active, disabled: disabledState,
  } = colorVariant || {};

  const { buttonStyle, layoutStyle } = buttonType || {};

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
    <button className={styles} disabled={disabled} onClick={onClick}>
      <div className={layoutStyle || ''}>
        {icon}
        <Paragraph className="text-inherit">{children}</Paragraph>
      </div>
    </button>
  );
}

PillButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.shape({
    icon: PropTypes.shape({
      buttonStyle: PropTypes.string.isRequired,
      layoutStyle: PropTypes.string,
    }),
    regular: PropTypes.shape({
      buttonStyle: PropTypes.string.isRequired,
      layoutStyle: PropTypes.string,
    }),
  }),
  colorVariant: PropTypes.shape({
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
