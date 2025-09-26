// src/components/movie/MovieSection.tsx
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Movie } from "../../services/movie/type";
import MovieComponent from "./index";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollStep = 250;
      const scrollAmount = direction === "left" ? -scrollStep : scrollStep;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full text-white px-4 relative mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto hide-scrollbar scroll-smooth relative"
      >
        <div className="flex gap-6 flex-nowrap">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieComponent movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 z-10"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default MovieSection;
