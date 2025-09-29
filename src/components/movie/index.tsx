import { useState } from "react";
import Card from "../card";
import type { Movie } from "../../services/movie";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  movie: Movie;
}

const IMG_BASE = import.meta.env.VITE_IMG_BASE;

const MovieComponent = ({ movie }: Props) => {
  const { poster_path, release_date, title, vote_average, id, overview } =
    movie;
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${id}`); // ganti sesuai route detail movie
  };

  return (
    <>
      <Card color="#000000" width="250px" height="auto" border="10px">
        <div
          className="w-full hover:cursor-pointer relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleClick}
        >
          {/* Poster */}
          <div className="w-full h-[250px] bg-gray-300 flex items-center justify-center overflow-hidden rounded-t-[12px]">
            {poster_path ? (
              <img
                src={`${IMG_BASE}${poster_path}`}
                alt={title}
                className="w-full object-cover object-top transition-transform duration-300"
              />
            ) : (
              <span className="text-gray-600">No Image</span>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-bold text-lg line-clamp-2 min-h-[56px]">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Release: {release_date}</p>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">
                  {vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>
          </div>

          {/* Hover Modal */}
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-full bg-black/70 text-white p-4 rounded-lg flex flex-col justify-end"
              >
                <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
                <p className="text-sm text-gray-300 mb-2">{overview}</p>
                <button
                  onClick={handleClick}
                  className="mt-auto bg-yellow-500 text-black font-semibold px-3 py-1 rounded hover:bg-yellow-600"
                >
                  See Details
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </>
  );
};

export default MovieComponent;
