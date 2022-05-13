import styles from "./index.module.css";

export default function Button({
  icon,
  children,
  onClick,
  variant = "filled",
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
      className={`${styles.container} ${classes[variant]} ${disabled && styles.disabled}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
}
