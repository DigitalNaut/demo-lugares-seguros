import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PlaceCard from "components/PlaceCard";
import FAB from "components/FAB";
import { ErrorBanner } from "components/Error";
import { Spinner } from "components/Spinner";

import styles from "./Home.module.css";
import axios from "axios";

export default function Home({ configAppBar }) {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    configAppBar("Lugares Seguros");
  }, [configAppBar]);

  useEffect(() => {
    const controller = new AbortController();
    setLoadingError("");

    (async function () {
      try {
        setIsLoading(true);
        const { status, data } = await axios.get(
          "http://localhost:3001/places",
          {
            signal: controller.signal,
          }
        );
        setIsLoading(false);

        if (status === 200) setPlaces(data);
      } catch (error) {
        if (error.name !== "CanceledError") setLoadingError(error.message);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <main className={styles.container}>
      <FAB onClick={() => navigate("/places/new")} />
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
