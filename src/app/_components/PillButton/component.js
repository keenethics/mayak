'use client';

import PropTypes from 'prop-types';
import { Paragraph } from '@components/Typography';
import { cn } from '@/app/utils/cn';

export function PillButton({
  children,
  type = 'button',
  className,
  variant,
  colorVariant,
  icon,
  disabled = false,
  onClick,
}) {
  const buttonVariant = icon ? variant?.icon : variant?.regular;
  const { regular, hover, focused, active, disabled: disabledState } = colorVariant || {};

  const { buttonStyle, layoutStyle } = buttonVariant || {};

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
    <button className={styles} disabled={disabled} onClick={onClick} type={type}>
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
  variant: PropTypes.shape({
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
