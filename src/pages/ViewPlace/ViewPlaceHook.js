import { useState, useEffect } from "react";

import { getPlace, patchPlace } from "api/places";

export default function useViewPlace(placeId, configAppBar) {
  const [place, setPlace] = useState(null);
  const [formInput, setFormInput] = useState({
    user: "",
    text: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [loadingError, setLoadingError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formError, setFormError] = useState({});

  useEffect(() => {
    configAppBar("Ver un lugar", true);
  }, [configAppBar]);

  useEffect(() => {
    const controller = new AbortController();

    setLoadingError("");

    (async function fetchPlace() {
      try {
        setIsLoading(true);
        const { status, data } = await getPlace(placeId, controller.signal);
        setIsLoading(false);

        if (status === 200) setPlace(data);
      } catch (error) {
        if (error.name !== "CanceledError") setLoadingError(error.message);
      }
    })();

    return () => controller.abort();
  }, [placeId]);

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
      const { status } = await patchPlace(
        placeId,
        updatedPlace,
        controller.signal
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

  return {
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
  };
}
