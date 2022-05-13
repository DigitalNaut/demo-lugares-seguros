import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export default function ImagePreview({ url }) {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${url})` }}
    >
      {!url && (
        <div className={styles.innerMargin}>
          <FontAwesomeIcon icon={faCamera} />
          <span>Preview</span>
        </div>
      )}
    </div>
  );
}
ImagePreview.propTypes = {
  url: PropTypes.string,
};
ImagePreview.defaultProps = {
  url: null,
};
