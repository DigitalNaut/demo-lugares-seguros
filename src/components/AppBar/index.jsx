import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import styles from "./index.module.css";

export default function AppBar({ title, hasBackButton }) {
  const icon = hasBackButton ? faArrowLeft : faHome;

  return (
    <>
      <nav className={styles.container}>
        <Link to={hasBackButton ? -1 : "/"} className={styles.link}>
          <FontAwesomeIcon icon={icon} />
        </Link>
        {title || "Lugares Seguros"}
      </nav>
      <Outlet />
    </>
  );
}
AppBar.propTypes = {
  title: PropTypes.string.isRequired,
  hasBackButton: PropTypes.bool,
};
AppBar.defaultProps = {
  hasBackButton: false,
};
