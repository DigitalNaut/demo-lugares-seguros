import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export default function Spinner() {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faSpinner} pulse size="2x" />
      <div className={styles.loadingText}>Cargando...</div>
    </div>
  );
}
