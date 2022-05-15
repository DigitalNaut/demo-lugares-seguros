import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment as faCommentRegular,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faIcons, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

function ParticipationStatus({ icon, count }) {
  return (
    <span className={styles.participationStatus}>
      {Math.max(count, 0) || 0}
      {icon || <FontAwesomeIcon icon={faIcons} />}
    </span>
  );
}
ParticipationStatus.propTypes = {
  icon: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
};

export default function PlaceCard({
  title,
  description,
  image,
  likesCount,
  commentsCount,
}) {
  return (
    <div className={styles.container}>
      <div style={{ background: `url(${image}) no-repeat center / cover` }} />
      <div className={styles.content}>
        <h3>{title || "Title"}</h3>
        <p className={styles.description}>{description || "Description"}</p>
        <div className={styles.participation}>
          <ParticipationStatus
            count={commentsCount}
            icon={
              <FontAwesomeIcon
                icon={commentsCount ? faComment : faCommentRegular}
              />
            }
          />
          <ParticipationStatus
            count={likesCount}
            icon={
              <FontAwesomeIcon
                icon={likesCount > 0 ? faHeart : faHeartRegular}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
PlaceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  likesCount: PropTypes.number,
  commentsCount: PropTypes.number,
};
PlaceCard.defaultProps = {
  likesCount: 0,
  commentsCount: 0,
}