import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PlaceCard from "components/PlaceCard";
import Spinner from "components/Spinner";
import ErrorBanner from "components/Error";
import { getPlaces } from "api/places";

import styles from "./index.module.css";

export default function Home({ configAppBar }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    configAppBar("Lugares Seguros");
  }, [configAppBar]);

  useEffect(() => {
    const controller = new AbortController();
    setLoadingError("");

    (async function fetchPlaces() {
      try {
        setIsLoading(true);
        const { status, data } = await getPlaces(controller.signal);
        setIsLoading(false);

        if (status === 200) setPlaces(data);
      } catch (error) {
        if (error.name !== "CanceledError") setLoadingError(error.message);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <main className={`page ${styles.bottomMargin}`}>
      {loadingError && <ErrorBanner message={loadingError} />}
      {isLoading && <Spinner />}

      {places.map(({ id, title, description, image, comments, likes }) => (
        <Link key={id} to={`/places/${id}/view`} className={styles.link}>
          <PlaceCard
            title={title}
            description={description}
            image={image}
            commentsCount={comments?.length || 0}
            likesCount={likes}
          />
        </Link>
      )) || "No hay lugares seguros"}
    </main>
  );
}
Home.propTypes = {
  configAppBar: PropTypes.func.isRequired,
};
