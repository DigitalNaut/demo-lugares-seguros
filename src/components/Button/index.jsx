import styles from "./index.module.css";

export default function Button({
  icon,
  children,
  onClick,
  variant = "filled",
}) {
  const classes = {
    filled: styles.filledVariant,
    outline: styles.outlinedVariant,
    text: styles.textVariant,
  };

  return (
    <button
      className={`${styles.container} ${classes[variant]}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}
