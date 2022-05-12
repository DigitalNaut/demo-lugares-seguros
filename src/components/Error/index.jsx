import styles from "./index.module.css";

export function ErrorBanner({ message }) {
  return <p className={styles.error}>{message}</p>;
}
