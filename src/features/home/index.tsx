import React from "react";
import { usePopularMovie } from "../../hooks/movie/usePopular";
import { useTopRatedMovie } from "../../hooks/movie/useTopRated";
import MovieSection from "../../components/movie/MovieSection";

const HomeScreen = () => {
  const { popularMovie } = usePopularMovie();
  const { topRatedMovie } = useTopRatedMovie();

  return (
    <>
      <MovieSection title="Popular" movies={popularMovie} />
      <MovieSection title="Top Rated" movies={topRatedMovie} />
    </>
  );
};

export default HomeScreen;
