import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export default function FAB({ onClick }) {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}
FAB.propTypes = {
  onClick: PropTypes.func.isRequired,
};
