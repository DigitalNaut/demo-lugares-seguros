import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye, faSave } from "@fortawesome/free-solid-svg-icons";

import Button from "components/Button";
import ImagePreview from "components/ImagePreview";
import Input from "components/Input";
import Spinner from "components/Spinner";
import ErrorBanner from "components/Error";
import DeleteButton from "components/DeleteButton";

import useEditPlace from "./EditPlaceHook";
import styles from "./index.module.css";

const validImageUrlPattern = /^https?:\/\/.+$/;
export default function EditPlace({ configAppBar }) {
  const { placeId } = useParams();

  const navigate = useNavigate();
  const {
    isLoading,
    setIsLoading,
    formInput,
    setFormInput,
    submitSuccess,
    setSubmitSuccess,
    formError,
    setFormError,
    loadingError,
    setLoadingError,
    onSubmit,
    submitError,
  } = useEditPlace(placeId, configAppBar);

  if (submitSuccess) {
    return (
      <main className={`page ${styles.flexMiddle}`}>
        <h1>¡Lugar {placeId ? "actualizado" : "creado"}!</h1>
        <div className={styles.buttons}>
          <Button
            icon={<FontAwesomeIcon icon={faAngleLeft} />}
            variant="text"
            onClick={() => {
              setSubmitSuccess(false);
              navigate("/");
            }}
          >
            Volver
          </Button>
          <Button
            icon={<FontAwesomeIcon icon={faEye} />}
            onClick={() => {
              setSubmitSuccess(false);
              navigate(`/places/${formInput.id}/view`);
            }}
          >
            Revisar
          </Button>
        </div>
      </main>
    );
  }

  if (isLoading)
    return (
      <main className="page">
        {loadingError && <ErrorBanner message={loadingError} />}
        <Spinner />
      </main>
    );

  return (
    <main className="page">
      <h1>{placeId ? "Editar" : "Crear"} un lugar seguro</h1>
      <ImagePreview
        url={validImageUrlPattern.test(formInput.image) ? formInput.image : ""}
      />
      {placeId && (
        <div className={styles.buttons}>
          <DeleteButton
            placeId={placeId}
            setLoading={setIsLoading}
            setLoadingError={setLoadingError}
          />
          <Button
            icon={<FontAwesomeIcon icon={faEye} />}
            variant="text"
            onClick={() => {
              navigate(`/places/${placeId}/view`);
            }}
          >
            Ver lugar
          </Button>
        </div>
      )}
      <form className={styles.form} onSubmit={onSubmit}>
        {submitError && <ErrorBanner message={submitError} />}
        <Input
          label="Nombre"
          name="title"
          placeholder="Nombre del lugar"
          fontSize="larger"
          value={formInput.title}
          setInput={setFormInput}
          setError={setFormError}
          supportText={formError.title}
          required
        />
        <Input
          label="Imagen"
          name="image"
          placeholder="Link de la imagen"
          value={formInput.image}
          setInput={setFormInput}
          setError={setFormError}
          supportText={formError.image}
          pattern={validImageUrlPattern}
          required
        />
        <Input
          label="Descripción"
          name="description"
          placeholder="Breve descripción del lugar"
          value={formInput.description}
          setInput={setFormInput}
          setError={setFormError}
          supportText={formError.description}
          multiline
          required
        />
        <div className={styles.buttons}>
          <Button type="submit" icon={<FontAwesomeIcon icon={faSave} />}>
            {placeId ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </main>
  );
}
EditPlace.propTypes = {
  configAppBar: PropTypes.func.isRequired,
};
