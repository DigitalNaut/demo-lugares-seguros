import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye, faSave } from "@fortawesome/free-solid-svg-icons";

import Button from "components/Button";
import ImagePreview from "components/ImagePreview";
import Input from "components/Input";
import Spinner from "components/Spinner";
import ErrorBanner from "components/Error";
import { postPlace, getPlace, putPlace } from "api/places";

import styles from "./index.module.css";

const validImageUrlPattern = /^https?:\/\/.+$/;

export default function EditPlace({ configAppBar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [formError, setFormError] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(!!id);
  const [loadingError, setLoadingError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    configAppBar(`${id ? "Editar" : "Crear"} un lugar`, true);
  }, [configAppBar, id]);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    setLoadingError("");

    (async function fetchPlace() {
      try {
        setIsLoading(true);
        const { status, data } = await getPlace(id, controller.signal);
        setIsLoading(false);

        if (status === 200) setFormInput({ ...data });
      } catch (error) {
        if (error.name !== "CanceledError")
          setLoadingError(`Error al obtener el lugar: ${error.message}`);
      }
    })();
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    try {
      let status;
      let data;

      setIsLoading(true);
      if (!id) {
        ({ status, data } = await postPlace(formInput));
      } else {
        ({ status, data } = await putPlace(id, formInput));
      }
      setIsLoading(false);

      if (status >= 200 && status < 300) {
        setFormInput({ ...formInput, id: data.id });
        setFormError({});
        setSubmitSuccess(true);
      }
    } catch (error) {
      if (error.name !== "CanceledError") setSubmitError(error.message);
    }
  };

  if (submitSuccess) {
    return (
      <main className={`page ${styles.flexMiddle}`}>
        <h1>¡Lugar {id ? "actualizado" : "creado"}!</h1>
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
      <h1>{id ? "Editar" : "Crear"} un lugar seguro</h1>
      <ImagePreview
        url={validImageUrlPattern.test(formInput.image) ? formInput.image : ""}
      />
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
            {id ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </main>
  );
}
EditPlace.propTypes = {
  configAppBar: PropTypes.func.isRequired,
};
