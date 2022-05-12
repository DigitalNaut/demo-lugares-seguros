import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./index.module.css";

export default function AppBar({ title, hasBackButton }) {
  const icon = hasBackButton ? faArrowLeft : faHome;

  return (
    <>
      <nav className={styles.container}>
        <NavLink to={hasBackButton ? -1 : "/"} className={styles.navLink}>
          <FontAwesomeIcon icon={icon} />
        </NavLink>
        {title || "Lugares Seguros"}
      </nav>
      <Outlet />
    </>
  );
}
