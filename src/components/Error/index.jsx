import PropTypes from "prop-types";

import styles from "./index.module.css";

export default function ErrorBanner({ message }) {
  return <p className={styles.error}>{message}</p>;
}
ErrorBanner.propTypes = {
  message: PropTypes.string.isRequired,
};
