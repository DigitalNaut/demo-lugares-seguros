import React from "react";
import PropTypes from "prop-types";

import styles from "./index.module.css";

export default function Button({
  icon,
  children,
  onClick,
  variant,
  style,
  disabled,
}) {
  const classes = {
    filled: styles.filledVariant,
    outline: styles.outlinedVariant,
    text: styles.textVariant,
  };

  return (
    <button
      type="button"
      className={`${styles.container} ${classes[variant]} ${
        disabled && styles.disabled
      }`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
}
Button.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  style: React.CSSProperties,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  variant: "filled",
  disabled: false,
  style: null,
};
