import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "components/Button";
import { deletePlace } from "api/places";

export default function DeleteButton({ placeId, setLoading, setLoadingError }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (
        // eslint-disable-next-line no-alert
        !window.confirm(
          "El lugar se borrará\nEl lugar se borrará con todos sus comentarios permanentemente."
        )
      )
        return;

        setLoading(true);
      const { status } = await deletePlace(placeId);
      setLoading(false);

      if (status === 200) navigate("/");
    } catch (error) {
      if (error.name !== "CanceledError")
        setLoadingError(`Error al eliminar el lugar: ${error.message}`);
    }
  };

  return (
    <Button
      icon={<FontAwesomeIcon icon={faTrash} />}
      variant="text"
      onClick={handleDelete}
    >
      Eliminar
    </Button>
  );
}
DeleteButton.propTypes = {
  placeId: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setLoadingError: PropTypes.func.isRequired,
};
