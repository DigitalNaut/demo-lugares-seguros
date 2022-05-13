import PropTypes from "prop-types";
import styles from "./index.module.css";

export default function UserComment({ text, user }) {
  return (
    <div className={styles.container}>
      <p>{text}</p>
      <p className={styles.user}>- {user}</p>
    </div>
  );
}
UserComment.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
