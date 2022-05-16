import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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
import { getPlace, patchPlace } from "api/places";

import styles from "./index.module.css";

export default function ViewPlace({ configAppBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [formInput, setFormInput] = useState({
    user: "",
    text: "",
  });
  const [formError, setFormError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    configAppBar("Ver un lugar", true);
  }, [configAppBar]);

  useEffect(() => {
    const controller = new AbortController();

    setLoadingError("");

    (async function fetchPlace() {
      try {
        setIsLoading(true);
        const { status, data } = await getPlace(id, controller.signal);
        setIsLoading(false);

        if (status === 200) setPlace(data);
      } catch (error) {
        if (error.name !== "CanceledError") setLoadingError(error.message);
      }
    })();

    return () => controller.abort();
  }, [id]);

  const clearForm = () => {
    setFormInput({
      user: "",
      text: "",
    });
    setFormError({});
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    const controller = new AbortController();

    try {
      const updatedPlace = {
        ...place,
        comments: [...(place.comments || []), { ...formInput, id: Date.now() }],
      };

      setIsSubmitting(true);
      const { status } = await patchPlace(id, updatedPlace, controller.signal);
      setIsSubmitting(false);

      if (status === 200) {
        setPlace(updatedPlace);
        clearForm();
      }
    } catch (error) {
      if (error.name !== "CanceledError")
        setSubmitError(`Error al enviar el comentario: ${error.message}`);
    }

    return () => controller.abort();
  };

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
          placeId={id}
          setLoading={setIsLoading}
          setLoadingError={setLoadingError}
        />
        <Button
          icon={<FontAwesomeIcon icon={faEdit} />}
          variant="text"
          onClick={() => {
            navigate(`/places/${id}/edit`);
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
