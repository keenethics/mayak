import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "../Typography";
import cn from "@/app/utils/cn";

export default function PillButton({
  children,
  className,
  type,
  colorVariant,
  icon,
  disabled = false,
  onClick,
}) {
  const buttonType = icon ? type.icon : type.regular;
  const {
    regular,
    hover,
    focused,
    active,
    disabled: disabledState,
  } = colorVariant;
  const { buttonStyle, layoutStyle } = buttonType;

  const styles = cn(
    "gap-[8px] rounded-[100px]",
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
      <div className={layoutStyle || ""}>
        {icon}
        <Paragraph className={type.paragraphStyle}>{children}</Paragraph>
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
    paragraphStyle: PropTypes.string,
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
