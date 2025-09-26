import { useEffect, useState } from "react";
import type { Movie } from "../../services/movie/type";
import { getPopular } from "../../services/movie";

export const usePopularMovie = () => {
  const [popularMovie, setPopularMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPopular();

        if (response) {
          setPopularMovie(response?.results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { popularMovie };
};
