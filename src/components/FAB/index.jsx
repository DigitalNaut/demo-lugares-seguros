import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export default function WithFAB({ onClick }) {
  return (
    <>
      <button type="button" className={styles.container} onClick={onClick}>
        <FontAwesomeIcon icon={faPlus} /> Crear lugar
      </button>
      <Outlet />
    </>
  );
}
WithFAB.propTypes = {
  onClick: PropTypes.func.isRequired,
};
