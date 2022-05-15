import React from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";

import styles from "./index.module.css";

export default function Button({
  type,
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
      // eslint-disable-next-line react/button-has-type
      type={type}
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
  type: PropTypes.string,
  icon: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  style: stylePropType,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  type: "button",
  variant: "filled",
  disabled: false,
  style: null,
  onClick: undefined,
};
