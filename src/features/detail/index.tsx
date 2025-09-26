import React from "react";
import { useMovieDetail } from "../../hooks/movie/useDetail";

const IMG_BASE = import.meta.env.VITE_IMG_BASE;
const MovieDetail: React.FC = () => {
  const { movie, trailer, loading } = useMovieDetail();

  if (loading)
    return (
      <div className="max-w-6xl mx-auto space-y-4 animate-pulse">
        <div className="h-10 bg-gray-700 rounded w-3/4" />
        <div className="h-64 bg-gray-700 rounded w-full" />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 h-80 bg-gray-700 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-700 rounded w-1/2" />
            <div className="h-6 bg-gray-700 rounded w-1/3" />
            <div className="h-6 bg-gray-700 rounded w-1/4" />
            <div className="h-6 bg-gray-700 rounded w-2/3" />
            <div className="h-6 bg-gray-700 rounded w-full" />
            <div className="h-40 bg-gray-700 rounded w-full mt-4" />
          </div>
        </div>
      </div>
    );

  if (!movie) return <p>Movie not found.</p>;

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <div className="max-w-6xl mx-auto text-white space-y-4">
      <h1 className="text-4xl font-bold">{movie.title}</h1>

      {trailer && (
        <iframe
          className="w-full h-80 lg:h-[500px] rounded-lg mb-6"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {/* Movie details */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 max-h-[500px] overflow-hidden rounded-lg">
          <img
            src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : ""}
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          <table className="w-full text-left border-collapse text-gray-100">
            <tbody>
              <tr>
                <th className="pr-4 py-2 font-medium">Original Title</th>
                <td className="py-2">{movie.original_title}</td>
              </tr>
              <tr>
                <th className="pr-4 py-2 font-medium">Release Date</th>
                <td className="py-2">{movie.release_date}</td>
              </tr>
              <tr>
                <th className="pr-4 py-2 font-medium">Rating</th>
                <td className="py-2 text-yellow-400">
                  {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
                </td>
              </tr>
              <tr>
                <th className="pr-4 py-2 font-medium">Duration</th>
                <td className="py-2">
                  {hours}h {minutes}m
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
