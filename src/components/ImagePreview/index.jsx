import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export default function ImagePreview({ url }) {
  // if (url)
  //   return (
  //     <div className={styles.container}>
  //       <img src={url} alt="Imagen" />
  //     </div>
  //   );

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
