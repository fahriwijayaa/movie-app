import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Movie, Video } from "../../services/movie/type";
import { getMovieById, getMovieVideos } from "../../services/movie";

export const useMovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const movieData = await getMovieById(id);
        if (movieData) setMovie(movieData as Movie);

        const videoData = await getMovieVideos(id);
        if (videoData?.results) {
          const officialTrailer = videoData.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          );
          if (officialTrailer) setTrailer(officialTrailer);
        }
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { movie, trailer, loading };
};
