import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faSpinner,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { patchPlace } from "api/places";
import Button from "components/Button";

export default function LikeButton({ place, setPlace }) {
  const [isTogglingLike, setIsTogglingLike] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeError, setLikedError] = useState("");

  const determineLikeIcon = () => {
    if (likeError) return faTimesCircle;
    if (isTogglingLike) return faSpinner;
    if (liked) return faHeartSolid;
    return faHeart;
  };

  const handleLike = async () => {
    const controller = new AbortController();

    setLikedError("");

    const likedPlace = {
      ...place,
      likes: liked ? place.likes - 1 : place.likes + 1,
    };

    try {
      setIsTogglingLike(true);
      const { status } = await patchPlace(place.id, likedPlace, controller.signal);
      setIsTogglingLike(false);

      if (status === 200) {
        setPlace(likedPlace);
        setLiked(!liked);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        setIsTogglingLike(false);
        setLikedError(`Error ${error.response.status}`);
      }
    }

    return () => controller.abort();
  };

  return (
    <Button
      icon={
        <FontAwesomeIcon icon={determineLikeIcon()} pulse={isTogglingLike} />
      }
      variant="text"
      onClick={handleLike}
      style={{ color: likeError && "red" }}
      disabled={isTogglingLike || !!likeError}
    >
      {likeError || "Like"}
    </Button>
  );
}
LikeButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  place: PropTypes.object.isRequired,
  setPlace: PropTypes.func.isRequired,
};
