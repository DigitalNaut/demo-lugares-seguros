import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.css";

export default function FAB({ onClick }) {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}