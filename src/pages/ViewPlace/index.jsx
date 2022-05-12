import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ImagePreview from "components/ImagePreview";
import Divider from "components/Divider";
import UserComment from "components/UserComment";

import styles from "./index.module.css";
import Input from "components/Input";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faHeart as faHeartSolid,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ErrorBanner } from "components/Error";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Spinner } from "components/Spinner";

export default function ViewPlace({ configAppBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [formInput, setFormInput] = useState({
    user: "",
    text: "",
  });
  const [liked, setLiked] = useState(false);
  const [likedError, setLikedError] = useState("");
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

    (async function () {
      try {
        setIsLoading(true);
        const { status, data } = await axios.get(
          `http://localhost:3001/places/${id}`,
          {
            signal: controller.signal,
          }
        );
        setIsLoading(false);

        if (status === 200) setPlace(data);
      } catch (error) {
        console.log(error.name);
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
      const { status } = await axios.patch(
        `http://localhost:3001/places/${id}`,
        updatedPlace,
        {
          signal: controller.signal,
        }
      );
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

  const handleLike = async () => {
    const controller = new AbortController();

    const likedPlace = {
      ...place,
      likes: liked ? place.likes - 1 : place.likes + 1,
    };

    try {
      const { status } = await axios.patch(
        `http://localhost:3001/places/${id}`,
        likedPlace,
        {
          signal: controller.signal,
        }
      );

      if (status === 200) {
        setPlace(likedPlace);
        setLiked(!liked);
      }
    } catch (error) {
      if (error.name !== "CanceledError")
        setLikedError(`Error al marcar como favorito: ${error.message}`);
    }

    return () => controller.abort();
  };

  const handleDelete = async () => {
    const controller = new AbortController();

    try {
      if (
        !window.confirm(
          "El lugar se borrará\nEl lugar se borrará con todos sus comentarios permanentemente."
        )
      )
        return;

      setIsLoading(true);
      const { status } = await axios.delete(
        `http://localhost:3001/places/${id}`,
        {
          signal: controller.signal,
        }
      );
      setIsLoading(false);

      if (status === 200) navigate("/");
    } catch (error) {
      if (error.name !== "CanceledError")
        setLoadingError(`Error al eliminar el lugar: ${error.message}`);
    }

    return () => controller.abort();
  };

  const { image, title, description, comments } = place || {};

  if (isLoading)
    return (
      <main className={styles.container}>
        {loadingError && <ErrorBanner message={loadingError} />}
        <Spinner />
      </main>
    );

  return (
    <main className={styles.container}>
      <h1>Ver un lugar seguro</h1>
      <ImagePreview url={image || ""} />
      <div className={styles.buttons}>
        <Button
          icon={<FontAwesomeIcon icon={faTrash} />}
          variant="text"
          onClick={handleDelete}
        >
          Eliminar
        </Button>
        <Button
          icon={<FontAwesomeIcon icon={faEdit} />}
          variant="text"
          onClick={() => {
            navigate(`/places/${id}/edit`);
          }}
        >
          Editar
        </Button>
        <Button
          icon={<FontAwesomeIcon icon={liked ? faHeartSolid : faHeart} />}
          variant="text"
          onClick={likedError || handleLike}
        >
          Like
        </Button>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Divider />
      <div className={styles.commentsSection}>
        <h3>Comentarios</h3>
        {!comments?.length && <p>No hay comentarios</p>}
        {comments?.map(({ id, text, user }) => (
          <UserComment key={id} text={text} user={user} />
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
