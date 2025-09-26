// src/hooks/movie/useTopRated.ts
import { useEffect, useState } from "react";
import type { Movie } from "../../services/movie/type";
import { getTopRated } from "../../services/movie";

export const useTopRatedMovie = () => {
  const [topRatedMovie, setTopRatedMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTopRated();
        if (response?.results) {
          setTopRatedMovie(response.results);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { topRatedMovie };
};
