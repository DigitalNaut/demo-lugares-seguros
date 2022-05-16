import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Spinner from "components/Spinner";
import ImagePreview from "components/ImagePreview";
import Divider from "components/Divider";
import UserComment from "components/UserComment";
import Input from "components/Input";
import Button from "components/Button";
import LikeButton from "components/LikeButton";
import ErrorBanner from "components/Error";
import DeleteButton from "components/DeleteButton";

import useViewPlace from "./ViewPlaceHook";
import styles from "./index.module.css";

export default function ViewPlace({ configAppBar }) {
  const { placeId } = useParams();
  const navigate = useNavigate();

  const {
    place,
    setPlace,
    formInput,
    setFormInput,
    formError,
    setFormError,
    isLoading,
    setIsLoading,
    loadingError,
    setLoadingError,
    isSubmitting,
    onSubmit,
    submitError,
  } = useViewPlace(placeId, configAppBar);

  const { image, title, description, comments } = place || {};

  if (isLoading)
    return (
      <main className="page">
        {loadingError && <ErrorBanner message={loadingError} />}
        <Spinner />
      </main>
    );

  return (
    <main className="page">
      <h1>Ver un lugar seguro</h1>
      <ImagePreview url={image || ""} />
      <div className={styles.buttons}>
        <DeleteButton
          placeId={placeId}
          setLoading={setIsLoading}
          setLoadingError={setLoadingError}
        />
        <Button
          icon={<FontAwesomeIcon icon={faEdit} />}
          variant="text"
          onClick={() => {
            navigate(`/places/${placeId}/edit`);
          }}
        >
          Editar
        </Button>
        <LikeButton place={place} setPlace={setPlace} />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Divider />
      <div className={styles.commentsSection}>
        <h3>Comentarios</h3>
        {!comments?.length && <p>No hay comentarios</p>}
        {comments?.map(({ id: commentId, text, user }) => (
          <UserComment key={commentId} text={text} user={user} />
        ))}
      </div>
      <Divider />
      <h3>Nuevo comentario</h3>
      {submitError && <ErrorBanner message={submitError} />}
      {isSubmitting && <Spinner />}
      {!isSubmitting && (
        <form className={styles.submitCommentForm} onSubmit={onSubmit}>
          <Input
            label="Autor"
            name="user"
            placeholder="Tu nombre"
            value={formInput.user}
            setInput={setFormInput}
            setError={setFormError}
            supportText={formError.user}
            required
          />
          <Input
            label="Añadir comentario"
            name="text"
            placeholder="Tu comentario"
            value={formInput.text}
            setInput={setFormInput}
            setError={setFormError}
            supportText={formError.text}
            multiline
            required
          />
          <div className={styles.buttons}>
            <Button
              type="submit"
              icon={<FontAwesomeIcon icon={faPaperPlane} />}
            >
              Comentar
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}
ViewPlace.propTypes = {
  configAppBar: PropTypes.func.isRequired,
};
