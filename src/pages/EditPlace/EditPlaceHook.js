import { useState, useEffect } from "react";
import { postPlace, getPlace, putPlace } from "api/places";

export default function useEditPlace(placeId, configAppBar) {
  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(!!placeId);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formError, setFormError] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    configAppBar(`${placeId ? "Editar" : "Crear"} un lugar`, true);
  }, [configAppBar, placeId]);

  useEffect(() => {
    if (!placeId) return;

    const controller = new AbortController();
    setLoadingError("");

    (async function fetchPlace() {
      try {
        setIsLoading(true);
        const { status, data } = await getPlace(placeId, controller.signal);
        setIsLoading(false);

        if (status === 200) setFormInput({ ...data });
      } catch (error) {
        if (error.name !== "CanceledError")
          setLoadingError(`Error al obtener el lugar: ${error.message}`);
      }
    })();
  }, [placeId]);

  const onSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    try {
      let status;
      let data;

      setIsLoading(true);
      if (!placeId) {
        ({ status, data } = await postPlace(formInput));
      } else {
        ({ status, data } = await putPlace(placeId, formInput));
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

  return {
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
  };
}
